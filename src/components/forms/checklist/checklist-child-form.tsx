'use client';

import { Plus, Trash } from 'lucide-react';
import { useContext } from 'react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import ChecklistContext, { type ChecklistItem } from '~/components/contexts/checklist-context';

interface Props {
  itemId: string;
  child: ChecklistItem['children'][number];
}

export const ChecklistChildForm = ({ itemId, child }: Props) => {
  const { addChild, removeChild, updateChildText } = useContext(ChecklistContext);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.metaKey && !e.ctrlKey && e.key === 'Enter') {
      addChild(itemId, child.id);
    }

    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      e.preventDefault();
      removeChild(child.id);
    }
  };

  return (
    <div className='flex w-full space-x-2'>
      <Input
        placeholder='Add child item'
        value={child.text}
        onChange={(e) => {
          updateChildText(child.id, e.target.value);
        }}
        onKeyDown={onKeyDown}
        autoFocus={child.shouldFocus}
      />

      <div className='flex items-center space-x-2'>
        <Button
          size='icon'
          variant='ghost'
          aria-label='Add item below'
          tabIndex={-1}
          onClick={() => {
            addChild(itemId, child.id);
          }}
        >
          <Plus className='size-4' aria-hidden='true' />
        </Button>

        <Button
          size='icon'
          variant='destructive'
          aria-label='Delete item'
          tabIndex={-1}
          onClick={() => {
            removeChild(child.id);
          }}
        >
          <Trash className='size-4' aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
};
