'use client';

import { forwardRef, useState } from 'react';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Input, type InputProps } from '~/components/ui/input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        ref={ref}
        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent'
        onClick={() => {
          setShowPassword((prev) => !prev);
        }}
        disabled={props.value === '' || props.disabled}
      >
        {showPassword ? (
          <EyeNoneIcon className='size-4' aria-hidden='true' />
        ) : (
          <EyeOpenIcon className='size-4' aria-hidden='true' />
        )}
        <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
