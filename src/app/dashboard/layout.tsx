import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { Header } from '~/components/layouts/header';

export const metadata: Metadata = {
  title: 'checkm8 • Dashboard',
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 flex-col p-4'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
