'use client';

import { useContext } from 'react';
import { Menu, Plus, Trash } from 'lucide-react';

import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import ChecklistContext, { type ChecklistItem } from '~/components/contexts/checklist-context';
import { ChecklistChildrenForm } from '~/components/forms/checklist/checklist-children-form';
import { cn } from '~/lib/utils';

interface Props {
  item: ChecklistItem;

  dragItemId: string | null;
  dragOverItemId: string | null;

  setDragItemId: (id: string | null) => void;
  setDragOverItemId: (id: string | null) => void;

  onDragItemEnd: () => void;
}

export const ChecklistItemForm = ({
  item,
  dragItemId,
  dragOverItemId,
  setDragItemId,
  setDragOverItemId,
  onDragItemEnd,
}: Props) => {
  const { items, addItem, removeItem, updateItemText } = useContext(ChecklistContext);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.metaKey && !e.ctrlKey && e.key === 'Enter') {
      addItem(item.id);
    }

    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      e.preventDefault();
      removeItem(item.id);
    }
  };

  return (
    <>
      <Card
        className='w-full'
        draggable={items.length > 1}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragStart={() => {
          setDragItemId(item.id);
        }}
        onDragEnter={() => {
          if (item.id === dragItemId) {
            setDragOverItemId(null);
            return;
          }

          setDragOverItemId(item.id);
        }}
        onDragEnd={onDragItemEnd}
      >
        <CardHeader className='flex w-full flex-row items-center justify-between p-4'>
          <div
            className={cn(
              'inline-flex size-9 items-center justify-center hover:cursor-pointer',
              items.length <= 1 && 'pointer-events-none opacity-50',
            )}
          >
            <Menu className='size-4' aria-hidden='true' />
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              size='icon'
              variant='ghost'
              aria-label='Add item below'
              tabIndex={-1}
              onClick={() => {
                addItem(item.id);
              }}
            >
              <Plus className='size-4' aria-hidden='true' />
            </Button>

            <Button
              size='icon'
              variant='destructive'
              aria-label='Delete item'
              tabIndex={-1}
              disabled={items.length === 1}
              onClick={() => {
                removeItem(item.id);
              }}
            >
              <Trash className='size-4' aria-hidden='true' />
            </Button>
          </div>
        </CardHeader>

        <CardContent className='p-4 pt-0'>
          <Input
            placeholder='Add item'
            value={item.text}
            onChange={(e) => {
              updateItemText(item.id, e.target.value);
            }}
            onKeyDown={onKeyDown}
            autoFocus={item.shouldFocus}
          />
        </CardContent>

        <CardFooter className='flex flex-col px-4 pb-4 pt-0 sm:px-10'>
          <ChecklistChildrenForm item={item} />
        </CardFooter>
      </Card>

      {item.id === dragOverItemId && <Skeleton className='h-16 w-full rounded-xl' />}
    </>
  );
};
