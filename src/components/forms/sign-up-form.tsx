'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { authSchema, type AuthSchemaType } from '~/lib/schemas/auth.schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/password-input';
import { Button } from '~/components/ui/button';
import { catchClerkError } from '~/lib/utils';

export const SignUpForm = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const reactHookForm = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }: AuthSchemaType) => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      router.push('/sign-up/verify-email');

      toast.message('Check your email', {
        description: 'We sent you a 6-digit verification code.',
      });
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

        <Button type='submit' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 size-4 animate-spin' aria-hidden='true' />
              Please wait
            </>
          ) : (
            <>Continue</>
          )}
          <span className='sr-only'>Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
};
