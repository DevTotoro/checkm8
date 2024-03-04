import type { Metadata } from 'next';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '~/components/ui/card';
import { VerifyEmailForm } from '~/components/forms/verify-email-form';

export const metadata: Metadata = {
  title: 'checkm8 • Verify email',
};

const VerifyEmailPage = () => {
  return (
    <main className='container px-0'>
      <Card className='mx-auto max-w-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Verify email</CardTitle>
          <CardDescription>Verify your email address to complete your account creation</CardDescription>
        </CardHeader>

        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default VerifyEmailPage;
