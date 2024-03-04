import { Skeleton } from '~/components/ui/skeleton';

const ChecklistLoading = () => {
  return (
    <div className='flex w-full max-w-lg flex-col space-y-16'>
      <div className='flex w-full flex-col space-y-6'>
        <div className='flex w-full items-center justify-between'>
          <Skeleton className='h-4 w-48 min-[400px]:w-56' />
          <Skeleton className='h-4 w-20' />
        </div>

        <Skeleton className='h-3 w-full' />
      </div>

      <div className='flex w-full max-w-lg flex-col space-y-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='flex w-full items-center space-x-4'>
            <Skeleton className='size-4' />
            <Skeleton className='h-4 w-full' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistLoading;
