import Link from 'next/link';
import { ListTodo } from 'lucide-react';

import { HeaderButtons } from '~/components/layouts/header-buttons';

interface Props {
  authPage?: boolean;
}

export const Header = ({ authPage }: Props) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <ListTodo className='size-6' aria-hidden='true' />

          <span className='hidden font-bold sm:inline-block'>checkm8</span>

          <span className='sr-only'>Home</span>
        </Link>

        <HeaderButtons authPage={authPage} />
      </div>
    </header>
  );
};
