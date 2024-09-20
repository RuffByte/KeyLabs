'use server';

import { z } from 'zod';
import { signUpSchema } from './SignUpForm';

export const signUp = async (values: z.infer<typeof signUpSchema>) => {};
