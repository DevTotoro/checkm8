import Link from 'next/link';

import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { ModeToggle } from '~/components/theme/mode-toggle';

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <Link href='/' className='flex items-center space-x-2'>
          <Icons.logo className='size-6' aria-hidden='true' />

          <span className='hidden font-bold sm:inline-block'>checkm8</span>

          <span className='sr-only'>Home</span>
        </Link>

        <div className='flex flex-1 items-center justify-end space-x-2'>
          <ModeToggle />

          <Button asChild>
            <Link href='/sign-in'>Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
