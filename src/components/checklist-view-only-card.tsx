import Link from 'next/link';
import type { Checklist } from '@prisma/client';
import { CheckboxIcon, CopyIcon } from '@radix-ui/react-icons';

import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '~/components/ui/context-menu';
import { copyToClipboard } from '~/lib/utils';

interface Props {
  checklist: Checklist;
  infiniteScrollRef?: (node: HTMLDivElement | null) => void;
}

export const ChecklistViewOnlyCard = ({ checklist, infiniteScrollRef }: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className='h-full w-full p-4' ref={infiniteScrollRef}>
          <Link href={`/checklist/${checklist.slug}`}>
            <CardHeader className='space-y-4 pb-4'>
              <CardTitle className='text-center'>{checklist.title}</CardTitle>
              <CardDescription className='text-center'>
                {checklist.description ?? 'Explore this checklist'}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          inset
          onClick={() => void copyToClipboard(`${window.location.origin}/checklist/${checklist.slug}`)}
        >
          <CopyIcon className='size-4' />
          Copy link
        </ContextMenuItem>
        <ContextMenuItem inset asChild>
          <Link href={`/checklist/${checklist.slug}`}>
            <CheckboxIcon className='size-4' />
            Use checklist
          </Link>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
