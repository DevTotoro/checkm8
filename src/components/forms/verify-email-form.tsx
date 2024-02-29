'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { verifyEmailSchema, type VerifyEmailSchemaType } from '~/lib/schemas/auth.schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { catchClerkError } from '~/lib/utils';

export const VerifyEmailForm = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const reactHookForm = useForm<VerifyEmailSchemaType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async ({ code }: VerifyEmailSchemaType) => {
    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        router.push('/dashboard');
      } else {
        toast.error('There was an error verifying your email address.');

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
            <>Create account</>
          )}
          <span className='sr-only'>Create account</span>
        </Button>
      </form>
    </Form>
  );
};
