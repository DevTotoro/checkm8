import { Header } from '~/components/layouts/header';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 flex-col p-4'>{children}</div>
    </div>
  );
};

export default HomeLayout;
