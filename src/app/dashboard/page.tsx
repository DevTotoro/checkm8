import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

const DashboardPage = () => {
  return (
    <div className='container mt-6 flex flex-col items-center gap-3 sm:px-14'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-3xl font-semibold'>Checklists</h1>

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

      <p className='mt-8 text-center text-3xl font-light'>Checklists</p>
    </div>
  );
};

export default DashboardPage;
