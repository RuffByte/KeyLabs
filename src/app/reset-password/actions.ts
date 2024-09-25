'use server';

import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { resetPasswordSchema } from '@/schemas/zod/schemas';
import { prisma } from '@/lib/prisma';

// Define the reset password action
export const resetPasswordAction = async ({
  token,
  password,
  confirmPassword,
}: {
  token: string | null; 
  password: string;
  confirmPassword: string;
}) => {

  if (!token) {
    return { success: false, message: 'Invalid or missing token.' };
  }

  const validation = resetPasswordSchema.safeParse({ password, confirmPassword });

  if (!validation.success) {
    return { success: false, message: validation.error.flatten().formErrors.join(', ') };
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return { success: false, message: 'Invalid or expired token.' };
    }

    const hashedPassword = await new Argon2id().hash(password)

    await prisma.user.update({
      where: { id: resetToken.userId }, 
      data: { hashedPassword: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { success: true, message: 'Password reset successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to reset the password.' };
  }
};
