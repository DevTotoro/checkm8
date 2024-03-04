import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';

export const Footer = () => {
  return (
    <footer className='z-50 w-full border-t bg-background'>
      <div className='container flex h-12 items-center justify-between text-muted-foreground'>
        <p className='text-xs font-medium'>
          Created by <span className='font-bold text-primary'>DevTotoro</span>
        </p>

        <Button size='icon' variant='ghost' className='size-8' aria-label='Link to GitHub project' asChild>
          <a href='https://github.com/DevTotoro/checkm8' target='_blank' rel='noopener noreferrer'>
            <GitHubLogoIcon className='size-3.5' aria-hidden='true' />
          </a>
        </Button>
      </div>
    </footer>
  );
};
