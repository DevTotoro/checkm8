import type { Metadata } from 'next';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '~/components/ui/card';
import { ResetPasswordConfirmForm } from '~/components/forms/reset-password-confirm-form';

export const metadata: Metadata = {
  title: 'checkm8 • Reset password',
};

const ResetPasswordConfirmPage = () => {
  return (
    <main className='container px-0'>
      <Card className='mx-auto max-w-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Reset password</CardTitle>
          <CardDescription>Enter your new password and the code we sent to your email address</CardDescription>
        </CardHeader>

        <CardContent>
          <ResetPasswordConfirmForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default ResetPasswordConfirmPage;
