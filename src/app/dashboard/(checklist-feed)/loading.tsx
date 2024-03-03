import { Card, CardDescription, CardHeader, CardFooter, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

const DashboardChecklistFeedLoading = () => {
  return (
    <div className='flex w-full flex-col items-center space-y-12'>
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 20 }).map((_, index) => (
          <Card key={index} className='flex w-full flex-col items-center space-y-4 p-4'>
            <CardHeader className='flex w-full flex-col items-center space-y-5 pb-4'>
              <CardTitle>
                <Skeleton className='h-3 w-24' />
              </CardTitle>
              <CardDescription>
                <Skeleton className='h-3 w-32' />
              </CardDescription>
            </CardHeader>

            <CardFooter className='flex w-full items-center justify-center pb-4'>
              <Skeleton className='h-4 w-32' />
            </CardFooter>
          </Card>
        ))}
      </div>

      <Skeleton className='h-4 w-56' />
    </div>
  );
};

export default DashboardChecklistFeedLoading;
