"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

function ResetPasswordFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to reset password");
      }
      
      toast.success("Password reset successfully! Please sign in.");
      router.push("/auth/signin");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-rose-600 font-medium">Invalid password reset link. Please request a new one.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-[2rem] shadow-soft border-2 border-slate-100">
        <div>
          <h2 className="text-center text-3xl font-black text-slate-800 tracking-tight">Create new password</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">New Password</label>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium"
                placeholder="Enter new password"
              />
              {errors.password && <p className="mt-2 text-sm font-bold text-rose-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium"
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && <p className="mt-2 text-sm font-bold text-rose-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-extrabold text-white text-lg bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Wrap the component using useSearchParams in a Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}