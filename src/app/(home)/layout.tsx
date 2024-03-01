import { currentUser } from '@clerk/nextjs';

import { Header } from '~/components/layouts/header';

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className='flex min-h-screen flex-col'>
      <Header user={user} />
      <div className='flex flex-1 flex-col p-4'>{children}</div>
    </div>
  );
};

export default HomeLayout;
