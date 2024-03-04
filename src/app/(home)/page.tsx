'use client';

import { ListTodo } from 'lucide-react';
import { useState } from 'react';

import { ChecklistSearch } from '~/components/checklist-search';
import { ChecklistViewOnlyFeed } from '~/components/checklist-view-only-feed';

const HomePage = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className='flex w-full flex-col items-center space-y-8'>
        <div className='flex items-center space-x-2'>
          <ListTodo className='size-10' aria-hidden='true' />
          <h1 className='text-3xl font-bold'>checkm8</h1>
        </div>

        <ChecklistSearch onSearch={setSearch} />
      </div>

      <ChecklistViewOnlyFeed search={search} />
    </>
  );
};

export default HomePage;
