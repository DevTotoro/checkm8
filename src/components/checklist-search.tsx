'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from './ui/input';

interface Props {
  onSearch: (search: string) => void;
}

export const ChecklistSearch = ({ onSearch }: Props) => {
  const [value, setValue] = useState('');
  const [search] = useDebounce(value, 500);

  useEffect(() => {
    onSearch(search);
  }, [search, onSearch]);

  return (
    <div className='w-full max-w-xl'>
      <Input
        placeholder='Find checklists...'
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
