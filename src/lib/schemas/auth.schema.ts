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

export type CheckEmailSchemaType = z.infer<typeof checkEmailSchema>;
export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
