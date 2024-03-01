import Link from 'next/link';
import type { User } from '@clerk/nextjs/server';

import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { SignOutButton } from '~/components/auth/sign-out-button';
import { ModeToggle } from '~/components/theme/mode-toggle';

interface Props {
  user: User | null;
}

export const Header = ({ user }: Props) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <Link href='/' className='flex items-center space-x-2'>
          <Icons.logo className='size-6' aria-hidden='true' />

          <span className='hidden font-bold sm:inline-block'>checkm8</span>

          <span className='sr-only'>Home</span>
        </Link>

        <div className='flex flex-1 items-center justify-end space-x-2'>
          {!!user ? (
            <Button asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant='ghost' className='hidden sm:flex' asChild>
                <Link href='/sign-in'>Sign in</Link>
              </Button>

              <Button asChild>
                <Link href='/sign-up'>Get started</Link>
              </Button>
            </>
          )}

          <ModeToggle />

          {!!user && <SignOutButton />}
        </div>
      </div>
    </header>
  );
};
