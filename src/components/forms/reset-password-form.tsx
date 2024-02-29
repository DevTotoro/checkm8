'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { checkEmailSchema, type CheckEmailSchemaType } from '~/lib/schemas/auth.schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { catchClerkError } from '~/lib/utils';

export const ResetPasswordForm = () => {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const reactHookForm = useForm<CheckEmailSchemaType>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: CheckEmailSchemaType) => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      if (result.status === 'needs_first_factor') {
        router.push('/reset-password/confirm');

        toast.message('Check your email', {
          description: 'We sent you a 6-digit verification code.',
        });
      } else {
        toast.error('There was an error sending the verification code.');

        console.error(result);
      }
    } catch (err) {
      catchClerkError(err);
    }

    setIsLoading(false);
  };

  return (
    <Form {...reactHookForm}>
      <form className='grid gap-4' onSubmit={(...args) => void reactHookForm.handleSubmit(onSubmit)(...args)}>
        <FormField
          control={reactHookForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' placeholder='janedoe42@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 size-4 animate-spin' aria-hidden='true' />
              Please wait
            </>
          ) : (
            <>Continue</>
          )}
          <span className='sr-only'>Continue to reset password verification</span>
        </Button>
      </form>
    </Form>
  );
};
