'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { SignOutButton as ClerkSignOutButton } from '@clerk/nextjs';
import { Loader2, LogOut } from 'lucide-react';

import { useMounted } from '~/hooks/use-mounted';
import { Button, buttonVariants } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';

export const SignOutButton = () => {
  const router = useRouter();
  const mounted = useMounted();
  const [isPending, startTransition] = useTransition();

  const onSignOut = () => {
    startTransition(() => {
      router.push('/');
    });
  };

  if (!mounted) {
    return (
      <Skeleton className={cn(buttonVariants({ size: 'icon', variant: 'outline' }), 'bg-muted text-muted-foreground')}>
        <LogOut className='size-4' />
      </Skeleton>
    );
  }

  return (
    <ClerkSignOutButton signOutCallback={onSignOut}>
      <Button aria-label='Sign out' variant='outline' size='icon' disabled={isPending}>
        {isPending ? <Loader2 className='size-4 animate-spin' /> : <LogOut className='size-4' />}
      </Button>
    </ClerkSignOutButton>
  );
};
