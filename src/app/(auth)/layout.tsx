import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { Header } from '~/components/layouts/header';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header authPage />
      <div className='flex flex-1 flex-col items-center justify-center p-4'>{children}</div>
    </div>
  );
};

export default AuthLayout;
