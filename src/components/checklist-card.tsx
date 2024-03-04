'use client';

import Link from 'next/link';
import type { Checklist } from '@prisma/client';
import { CopyIcon, Pencil2Icon, CheckboxIcon, TrashIcon } from '@radix-ui/react-icons';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Button } from '~/components/ui/button';
import { ChecklistDeleteConfirmDialog } from '~/components/checklist-delete-confirm-dialog';
import { copyToClipboard } from '~/lib/utils';

interface Props {
  checklist: Checklist;
}

export const ChecklistCard = ({ checklist }: Props) => {
  return (
    <Card className='w-full p-4'>
      <CardHeader className='space-y-4 pb-4'>
        <CardTitle className='text-center'>{checklist.title}</CardTitle>
        <CardDescription className='text-center'>{checklist.description ?? 'Explore this checklist'}</CardDescription>
      </CardHeader>

      <CardFooter className='flex w-full items-center justify-center space-x-2 pb-4'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => void copyToClipboard(`${window.location.origin}/checklist/${checklist.slug}`)}
            >
              <CopyIcon className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy link to clipboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' variant='ghost' asChild>
              <Link href={`/checklist/${checklist.slug}`}>
                <CheckboxIcon className='size-4' />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Use checklist</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' variant='ghost' asChild>
              <Link href={`/dashboard/checklists/edit/${checklist.slug}`}>
                <Pencil2Icon className='size-4' />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit checklist</TooltipContent>
        </Tooltip>

        <ChecklistDeleteConfirmDialog checklistId={checklist.id}>
          <Button size='icon' variant='ghost'>
            <TrashIcon className='size-4' />
          </Button>
        </ChecklistDeleteConfirmDialog>
      </CardFooter>
    </Card>
  );
};
