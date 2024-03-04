import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

const DashboardChecklistFeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='container mt-6 flex flex-1 flex-col items-center space-y-14 sm:px-14'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Your checklists</h1>

        <Button aria-label='Create checklist' className='hidden sm:flex' asChild>
          <Link href='/dashboard/checklists/create'>
            <PlusIcon className='mr-2 size-4' aria-hidden='true' />
            Create checklist
          </Link>
        </Button>
        <Button aria-label='Create checklist' size='icon' className='flex sm:hidden' asChild>
          <Link href='/dashboard/checklists/create'>
            <PlusIcon className='size-4' aria-hidden='true' />
          </Link>
        </Button>
      </div>

      {children}
    </div>
  );
};

export default DashboardChecklistFeedLayout;
