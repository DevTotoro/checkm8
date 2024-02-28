import type { Metadata } from 'next';

import { Header } from '~/components/layouts/header';

export const metadata: Metadata = {
  title: 'checkm8 • Dashboard',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 flex-col p-4'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
