import { Header } from '~/components/layouts/header';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1 flex-col items-center justify-center p-4'>{children}</div>
    </div>
  );
};

export default AuthLayout;
