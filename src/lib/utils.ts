import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isClerkAPIResponseError } from '@clerk/nextjs';
import { z } from 'zod';
import { toast } from 'sonner';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const catchClerkError = (err: unknown) => {
  const unknownError = 'Something went wrong, please try again later.';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);

    return toast(errors.join('\n'));
  }

  if (isClerkAPIResponseError(err) && err.errors[0]?.longMessage) {
    return toast.error(err.errors[0].longMessage);
  }

  return toast.error(unknownError);
};
