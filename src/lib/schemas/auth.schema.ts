import { z } from 'zod';

export type AuthSchemaType = z.infer<typeof authSchema>;
export const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
});

export type VerifyEmailSchemaType = z.infer<typeof verifyEmailSchema>;
export const verifyEmailSchema = z.object({
  code: z.string().length(6, {
    message: 'Verification code must be 6 characters long',
  }),
});
