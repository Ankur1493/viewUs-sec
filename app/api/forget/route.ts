import { NextRequest, NextResponse } from 'next/server';
import { getEmailVerificationTokenByToken } from "@/data/verificationToken"
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { id, token, newPassword } = await req.json();

    if (!id || !token || !newPassword) {
      return NextResponse.json({ status: false, message: 'Invalid values passed' }, { status: 400 });
    }

    // Verify token
    const verificationToken = await getEmailVerificationTokenByToken(token);
    if (!verificationToken) {
      return NextResponse.json({ status: false, message: 'Invalid or expired token' }, { status: 400 });
    }

    // Check if the token has expired
    if (new Date(verificationToken.expires) < new Date()) {
      return NextResponse.json({ status: false, message: 'Token has expired' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    // Delete the used token
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.json({ status: true, message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ status: false, message: 'An error occurred while resetting the password' }, { status: 500 });
  }
}

