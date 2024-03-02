'use client';

import { Save } from 'lucide-react';

import { Button } from '~/components/ui/button';

export const CreateChecklistForm = () => {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Create checklist</h2>

        <Button aria-label='Create checklist' className='hidden sm:flex'>
          <Save className='mr-2 size-4' />
          Create
        </Button>
        <Button aria-label='Create checklist' size='icon' className='flex sm:hidden'>
          <Save className='size-4' />
        </Button>
      </div>

      <p className='mt-10 text-center text-3xl font-light'>Create checklist form</p>
    </>
  );
};
