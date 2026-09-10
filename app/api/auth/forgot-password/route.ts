import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase } from "@/lib/database"; 

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const db = await getDatabase();

    // 1. Verify user exists using a strict type instead of any[]
    const users = await db.all('SELECT id FROM users WHERE email = $1', [email]) as { id: number }[];
    
    if (!users || users.length === 0) {
      // Return success silently to prevent email enumeration attacks
      return NextResponse.json({ success: true });
    }

    // 2. Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiration

    // 3. Save token to database
    await db.run(
      `INSERT INTO password_reset_tokens (email, token, expires_at) 
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET token = $2, expires_at = $3`,
      [email, resetToken, expiresAt]
    );

    // 4. Send Email (Configure with Resend, SendGrid, or Nodemailer)
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
    
    // TODO: Await your email provider's send function here.
    console.log("Password reset URL generated:", resetUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}