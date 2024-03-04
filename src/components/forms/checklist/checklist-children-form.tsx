'use client';

import { useContext } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button';
import ChecklistContext, { type ChecklistItem } from '~/components/contexts/checklist-context';
import { ChecklistChildForm } from '~/components/forms/checklist/checklist-child-form';

interface Props {
  item: ChecklistItem;
}

export const ChecklistChildrenForm = ({ item }: Props) => {
  const { addChild } = useContext(ChecklistContext);

  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-normal'>Child items</span>

        <Button
          size='sm'
          variant='outline'
          tabIndex={-1}
          onClick={() => {
            addChild(item.id);
          }}
        >
          <Plus className='mr-2 size-4' aria-hidden='true' />
          Add child item
        </Button>
      </div>

      {item.children.length > 0 && (
        <div className='mt-4 flex w-full flex-col space-y-2'>
          {item.children.map((child) => (
            <ChecklistChildForm key={child.id} itemId={item.id} child={child} />
          ))}
        </div>
      )}
    </>
  );
};
