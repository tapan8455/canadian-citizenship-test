import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase } from "@/lib/database"; 
import { Resend } from 'resend'; // Add this import

const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const db = await getDatabase();

    const users = await db.all('SELECT id FROM users WHERE email = $1', [email]) as { id: number }[];
    
    if (!users || users.length === 0) {
      return NextResponse.json({ success: true });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 300000).toISOString(); 

    await db.run(
      `INSERT INTO password_reset_tokens (email, token, expires_at) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET token = $2, expires_at = $3`,
      [email, resetToken, expiresAt]
    );

    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${resetToken}`;
    
    // Replace the TODO with this implementation:
    await resend.emails.send({
      from: 'No-reply <onboarding@resend.dev>', // Replace with your verified domain email later
      to: email,
      subject: 'Reset your Canadian Citizenship Test password',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to set a new one:</p>
        <p><a href="${resetUrl}">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
