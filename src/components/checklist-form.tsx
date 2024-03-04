'use client';

import { Prisma } from '@prisma/client';
import { useCallback, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { ItemStatus, db } from '~/lib/index-db';

type ChecklistWithRelations = Prisma.ChecklistGetPayload<{
  include: { items: { include: { subItems: true } } };
}>;

interface Props {
  checklist: ChecklistWithRelations;
}

export const ChecklistForm = ({ checklist }: Props) => {
  const list = useLiveQuery(() => db.checklists.get(checklist.id), [checklist.id]);

  const writeListFromChecklist = useCallback(async () => {
    await db.checklists.put({
      id: checklist.id,
      items: checklist.items.map((item) => ({
        itemId: item.id,
        status: ItemStatus.INCOMPLETE,
        subItems: item.subItems.map((subItem) => ({
          subItemId: subItem.id,
          status: ItemStatus.INCOMPLETE,
        })),
      })),
    });
  }, [checklist]);

  const onChangeItemStatus = useCallback(
    async (itemId: string, status: ItemStatus) => {
      if (!list) return;

      const updatedItems = list.items.map((item) => {
        if (item.itemId !== itemId) return item;

        return { ...item, status };
      });

      await db.checklists.put({
        id: list.id,
        items: updatedItems,
      });
    },
    [list],
  );

  const onChangeSubItemStatus = useCallback(
    async (itemId: string, subItemId: string, status: ItemStatus) => {
      if (!list) return;

      const updatedItems = list.items.map((item) => {
        if (item.itemId !== itemId) return item;

        const updatedSubItems = item.subItems.map((subItem) => {
          if (subItem.subItemId !== subItemId) return subItem;

          return { ...subItem, status };
        });

        // If all sub-items are complete, mark the parent item as complete
        const allSubItemsComplete = updatedSubItems.every((subItem) => subItem.status === ItemStatus.COMPLETE);
        const updatedItemStatus = allSubItemsComplete ? ItemStatus.COMPLETE : ItemStatus.INCOMPLETE;

        return { ...item, status: updatedItemStatus, subItems: updatedSubItems };
      });

      await db.checklists.put({
        id: list.id,
        items: updatedItems,
      });
    },
    [list],
  );

  useEffect(() => {
    db.checklists
      .get(checklist.id)
      .then((list) => {
        if (list) return;

        writeListFromChecklist().catch(console.error);
      })
      .catch(console.error);
  }, [checklist.id, writeListFromChecklist]);

  if (!list) return null;

  return (
    <>
      <div className='flex w-full flex-col space-y-2'>
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-lg font-semibold min-[400px]:text-2xl'>{checklist.title}</h2>
          <Button onClick={() => void writeListFromChecklist()}>Reset</Button>
        </div>

        <p className='text-sm font-light text-muted-foreground'>{checklist.description}</p>
      </div>

      <div className='flex w-full max-w-lg flex-col space-y-4'>
        {list.items.map(({ itemId, status, subItems }) => (
          <div key={itemId} className='flex flex-col space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id={itemId}
                checked={status === ItemStatus.COMPLETE}
                onCheckedChange={(checked) => {
                  const isChecked = checked && checked !== 'indeterminate';

                  onChangeItemStatus(itemId, isChecked ? ItemStatus.COMPLETE : ItemStatus.INCOMPLETE).catch(
                    console.error,
                  );
                }}
              />
              <label
                htmlFor={itemId}
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {checklist.items.find((item) => item.id === itemId)?.text}
              </label>
            </div>

            {subItems.length > 0 && (
              <div className='ml-4 flex flex-col space-y-2'>
                {subItems.map(({ subItemId, status }) => (
                  <div key={subItemId} className='flex items-center space-x-2'>
                    <Checkbox
                      id={subItemId}
                      checked={status === ItemStatus.COMPLETE}
                      onCheckedChange={(checked) => {
                        const isChecked = checked && checked !== 'indeterminate';

                        onChangeSubItemStatus(
                          itemId,
                          subItemId,
                          isChecked ? ItemStatus.COMPLETE : ItemStatus.INCOMPLETE,
                        ).catch(console.error);
                      }}
                    />
                    <label
                      htmlFor={subItemId}
                      className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {
                        checklist.items
                          .find((item) => item.id === itemId)
                          ?.subItems.find((subItem) => subItem.id === subItemId)?.text
                      }
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
