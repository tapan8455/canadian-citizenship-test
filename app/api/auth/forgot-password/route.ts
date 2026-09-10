// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "@/lib/database"; // Using your existing database utility

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Verify user exists
    const users = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (users.length === 0) {
      // Return success silently to prevent email enumeration attacks
      return NextResponse.json({ success: true });
    }

    // 2. Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiration

    // 3. Save token to database
    await query(
      `INSERT INTO password_reset_tokens (email, token, expires_at) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET token = $2, expires_at = $3, created_at = CURRENT_TIMESTAMP`,
      [email, resetToken, expiresAt]
    );

    // 4. Send Email (Configure with Resend, SendGrid, or Nodemailer)
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
    
    // TODO: Await your email provider's send function here.
    // await sendEmail(email, "Reset your Canadian Citizenship Test Password", `Click here to reset your password: ${resetUrl}`);
    console.log("Password reset URL generated:", resetUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}