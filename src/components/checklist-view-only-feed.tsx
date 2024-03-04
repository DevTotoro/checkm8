'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import { ChecklistViewOnlyCard } from '~/components/checklist-view-only-card';
import { Loader2 } from 'lucide-react';

export const ChecklistViewOnlyFeed = () => {
  const router = useRouter();

  const { status, error, isFetching, data, hasNextPage, fetchNextPage } = api.checklist.getAll.useInfiniteQuery(
    {
      take: 32,
    },
    {
      getNextPageParam: (lastPage) => lastPage.meta.cursor,
    },
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (status === 'loading') return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage().catch(console.error);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [status, hasNextPage, fetchNextPage],
  );

  if (status === 'loading') {
    return (
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 32 }).map((_, index) => (
          <Card key={index} className='flex w-full flex-col items-center space-y-4 p-4'>
            <CardHeader className='flex w-full flex-col items-center space-y-5 pb-4'>
              <Skeleton className='h-3 w-24' />
              <Skeleton className='h-3 w-32' />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (status === 'error') {
    console.error(error);

    return (
      <main className='flex flex-1 flex-col items-center justify-center gap-2'>
        <h3 className='text-xl font-semibold'>Something went wrong</h3>

        <p className='mt-5 text-center text-sm text-muted-foreground'>
          An error occured while fetching the checklists.
          <br />
          Please use the button below to try again or{' '}
          <a href='mailto:totoro.softwaredev@gmail.com' className='text-primary underline'>
            contact support
          </a>
          .
        </p>

        <Button
          className='mt-5'
          onClick={() => {
            router.refresh();
          }}
        >
          Refresh
        </Button>
      </main>
    );
  }

  return (
    <div className='flex w-full flex-col space-y-8'>
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
        {data.pages.map((page) =>
          page.data.map((checklist) => (
            <ChecklistViewOnlyCard
              key={checklist.id}
              checklist={checklist}
              infiniteScrollRef={page.meta.cursor === checklist.id ? lastItemRef : undefined}
            />
          )),
        )}
      </div>

      <div className='w-full pb-4 text-muted-foreground'>
        {hasNextPage && isFetching ? (
          <Loader2 className='mx-auto size-12 animate-spin ' />
        ) : (
          <p className='text-center text-sm font-medium'>You&apos;ve reached the end of the list</p>
        )}
      </div>
    </div>
  );
};
