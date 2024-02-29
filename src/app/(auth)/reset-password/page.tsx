import type { Metadata } from 'next';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '~/components/ui/card';
import { ResetPasswordForm } from '~/components/forms/reset-password-form';

export const metadata: Metadata = {
  title: 'checkm8 • Reset password',
};

const ResetPasswordPage = () => {
  return (
    <main className='container px-0'>
      <Card className='mx-auto max-w-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Reset password</CardTitle>
          <CardDescription>Enter your email address and we will send you a verification code</CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPasswordPage;
