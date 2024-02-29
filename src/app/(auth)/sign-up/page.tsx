import type { Metadata } from 'next';
import Link from 'next/link';

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '~/components/ui/card';
import { OAuthSignIn } from '~/components/auth/oauth-sign-in';
import { SignUpForm } from '~/components/forms/sign-up-form';

export const metadata: Metadata = {
  title: 'checkm8 • Sign up',
};

const SignUpPage = () => {
  return (
    <main className='container px-0'>
      <Card className='mx-auto max-w-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Sign up</CardTitle>
          <CardDescription>Choose your preferred sign up method</CardDescription>
        </CardHeader>

        <CardContent className='grid gap-4'>
          <OAuthSignIn />

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
          </div>

          <SignUpForm />
        </CardContent>

        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>Already have an account?</span>
            <Link
              aria-label='Sign in'
              href='/sign-in'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignUpPage;
