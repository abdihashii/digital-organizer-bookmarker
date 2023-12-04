import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters long',
  }),
});

export const signUpSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters long',
  }),
  confirmPassword: z.string(),
});
