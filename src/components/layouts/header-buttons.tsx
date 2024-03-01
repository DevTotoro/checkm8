'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';
import { Loader2, LogOut } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { ModeToggle } from '~/components/theme/mode-toggle';

interface Props {
  authPage?: boolean;
}

export const HeaderButtons = ({ authPage }: Props) => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();

  const onSignOut = () => {
    startTransition(() => {
      router.push('/');
    });
  };

  if (!isLoaded) {
    return <Skeleton className='h-4 w-32' />;
  }

  return (
    <div className='flex items-center space-x-2'>
      {!authPage &&
        (isSignedIn ? (
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
        ))}

      <ModeToggle />

      {!authPage && isSignedIn && (
        <ClerkSignOutButton signOutCallback={onSignOut}>
          <Button aria-label='Sign out' variant='outline' size='icon' disabled={isPending}>
            {isPending ? <Loader2 className='size-4 animate-spin' /> : <LogOut className='size-4' />}
          </Button>
        </ClerkSignOutButton>
      )}
    </div>
  );
};
