import { getUserChecklists } from '~/lib/actions/checklist';

import { ChecklistCard } from '~/components/checklist-card';
import { RotatingPagination } from '~/components/rotating-pagination';

interface Props {
  take: number;
  skip: number;
}

export const ChecklistFeed = async ({ take, skip }: Props) => {
  const { data: checklists, meta } = await getUserChecklists({ take, skip });

  return (
    <div className='flex w-full flex-col space-y-12'>
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {checklists.map((checklist) => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </div>

      <RotatingPagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        hasNextPage={meta.hasNextPage}
        take={take}
        skip={skip}
        baseUrl='dashboard'
      />
    </div>
  );
};
