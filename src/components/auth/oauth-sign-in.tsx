'use client';

import type { OAuthStrategy } from '@clerk/types';
import type { IconType } from 'react-icons';
import { FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa6';

import { Button } from '~/components/ui/button';

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
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
      {providers.map(({ name, icon: Icon }) => (
        <Button
          aria-label={`Sign in with ${name}`}
          key={name}
          variant='outline'
          className='w-full bg-background sm:w-auto'
        >
          <Icon className='mr-2 size-4' aria-hidden='true' />
          {name}
        </Button>
      ))}
    </div>
  );
};
