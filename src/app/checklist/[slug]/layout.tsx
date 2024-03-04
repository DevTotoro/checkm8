import type { Metadata } from 'next';

import { Header } from '~/components/layouts/header';

export const metadata: Metadata = {
  title: 'checkm8 • Checklist',
};

const ChecklistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 flex-col p-4'>
        <div className='container mt-6 flex flex-1 flex-col items-center space-y-14 sm:px-14'>{children}</div>
      </div>
    </div>
  );
};

export default ChecklistLayout;
