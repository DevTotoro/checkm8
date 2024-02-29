'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authSchema, type AuthSchemaType } from '~/lib/schemas/auth.schema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/password-input';
import { Button } from '~/components/ui/button';

export const SignInForm = () => {
  const reactHookForm = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: AuthSchemaType) => {
    console.log({ email, password });
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

        <Button type='submit'>
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
  );
};
