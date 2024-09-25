'use server';

import { sendResetEmail } from "@/services/email/sendResetEmail";
import { z } from "zod"; // Import zod for input validation
import { rateLimitByKey } from "@/lib/limiter"; // Import rate limiting function

// Define input schema for validation
const resetPasswordInputSchema = z.object({
  email: z.string().email(),
});


export const resetPasswordAction = async (input: { email: string }) => {

  const validatedInput = resetPasswordInputSchema.parse(input);

  // Apply rate limiting
  await rateLimitByKey({ key: validatedInput.email, limit: 1, window: 30000 });

  await sendResetEmail(validatedInput.email);
};
