'use client';

import { useContext, useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button';
import ChecklistContext from '~/components/contexts/checklist-context';
import { ChecklistItemForm } from '~/components/forms/checklist/checklist-item-form';
import { cn } from '~/lib/utils';

export const ChecklistItemsForm = () => {
  const { items, itemsError: error, addItem, updateItemOrder } = useContext(ChecklistContext);

  const [dragItemId, setDragItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

  const onDragEnd = () => {
    if (!dragItemId || !dragOverItemId) {
      setDragItemId(null);
      return;
    }

    updateItemOrder(dragItemId, dragOverItemId);

    setDragItemId(null);
    setDragOverItemId(null);
  };

  return (
    <>
      {/* Header */}
      <div className='flex flex-col gap-1.5'>
        <div className='mt-10 flex w-full items-center justify-between'>
          <h5 className={cn('text-xl font-medium', error ? 'text-destructive' : '')}>Items</h5>

          <Button
            size='sm'
            variant='outline'
            tabIndex={-1}
            onClick={() => {
              addItem();
            }}
          >
            <Plus className='mr-2 size-4' aria-hidden='true' />
            Add item
          </Button>
        </div>

        {error && <p className='text-[0.9rem] font-medium text-destructive'>{error}</p>}
      </div>

      <div className='mt-6 flex flex-col space-y-4'>
        {items.map((item) => (
          <ChecklistItemForm
            key={item.id}
            item={item}
            dragItemId={dragItemId}
            dragOverItemId={dragOverItemId}
            setDragItemId={setDragItemId}
            setDragOverItemId={setDragOverItemId}
            onDragItemEnd={onDragEnd}
          />
        ))}
      </div>
    </>
  );
};
