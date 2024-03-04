import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { Header } from '~/components/layouts/header';

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <div className='flex flex-1 flex-col p-4'>
          <main className='flex flex-1 flex-col items-center justify-center gap-2'>
            <h1 className='text-4xl font-bold'>404</h1>
            <p className='text-md font-extralight'>Page not found</p>

            <p className='mt-5 text-center text-sm text-muted-foreground'>
              The page you are looking for doesn&apos;t exist or another error occured. <br />
              Please go back, or return to the homepage.
            </p>

            <Button className='mt-5' asChild>
              <Link href='/'>Home</Link>
            </Button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
