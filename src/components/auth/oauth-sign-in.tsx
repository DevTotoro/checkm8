'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import type { OAuthStrategy } from '@clerk/types';
import type { IconType } from 'react-icons';
import { FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa6';
import { Loader2 } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { catchClerkError } from '~/lib/utils';

interface OAuthProvider {
  name: string;
  icon: IconType;
  strategy: OAuthStrategy;
}

const providers: OAuthProvider[] = [
  { name: 'Google', icon: FaGoogle, strategy: 'oauth_google' },
  { name: 'Discord', icon: FaDiscord, strategy: 'oauth_discord' },
  { name: 'GitHub', icon: FaGithub, strategy: 'oauth_github' },
];

export const OAuthSignIn = () => {
  const { isLoaded, signIn } = useSignIn();
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null);

  const onSignIn = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    setIsLoading(strategy);

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err) {
      catchClerkError(err);
    }

    setIsLoading(null);
  };

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
      {providers.map(({ name, strategy, icon: Icon }) => (
        <Button
          aria-label={`Sign in with ${name}`}
          key={name}
          variant='outline'
          className='w-full bg-background sm:w-auto'
          onClick={() => void onSignIn(strategy)}
          disabled={!!isLoading}
        >
          {isLoading === strategy ? (
            <Loader2 className='mr-2 size-4 animate-spin' aria-hidden='true' />
          ) : (
            <Icon className='mr-2 size-4' aria-hidden='true' />
          )}

          {name}
        </Button>
      ))}
    </div>
  );
};
