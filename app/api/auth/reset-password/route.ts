// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/database"; 

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 1. Verify token exists and is not expired
    const tokenRecords = await query(
      'SELECT email FROM password_reset_tokens WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP',
      [token]
    );

    if (tokenRecords.length === 0) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const userEmail = tokenRecords[0].email;

    // 2. Hash the new password using the existing bcrypt package
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update the user's password in the users table
    await query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, userEmail]);

    // 4. Delete the token to prevent it from being reused
    await query('DELETE FROM password_reset_tokens WHERE token = $1', [token]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}