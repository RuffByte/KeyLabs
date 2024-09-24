// app/auth/forgot-password/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { randomBytes } from 'crypto'; // Import crypto for secure random generation


const TOKEN_TTL = 60 * 60 * 1000; // 1 hour

// Function to generate a secure random token of the specified length
export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString('hex'); // Convert the buffer to a hexadecimal string
}

// Main function to send the password reset email
export async function sendResetEmail(email: string) {
  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('No user found with that email');
  }

  // Generate a cryptographically secure token using the custom function
  const token = await generateRandomToken(64); // Generate a 64-character token

  // Set token expiration using Date.now() and TOKEN_TTL
  const expiresAt = new Date(Date.now() + TOKEN_TTL); // Current time + TTL

  // Save the token in the database
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  // Create the password reset link
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // Send email using Resend
  await resend.emails.send({
    from: 'noreply@yourapp.com',
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });

  return 'Password reset email sent.';
}
