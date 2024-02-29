'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { resetPasswordSchema, type ResetPasswordSchemaType } from '~/lib/schemas/auth.schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/password-input';
import { Button } from '~/components/ui/button';
import { catchClerkError } from '~/lib/utils';

export const ResetPasswordConfirmForm = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const reactHookForm = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      code: '',
    },
  });

  const onSubmit = async ({ password, code }: ResetPasswordSchemaType) => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result.status === 'complete') {
        await setActive({
          session: result.createdSessionId,
        });

        router.push('/dashboard');

        toast.success('Password reset successfully.');
      } else {
        toast.error('There was an error resetting your password.');

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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={reactHookForm.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={reactHookForm.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  placeholder='169420'
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }}
                />
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
            <>Reset password</>
          )}
          <span className='sr-only'>Reset password</span>
        </Button>
      </form>
    </Form>
  );
};
