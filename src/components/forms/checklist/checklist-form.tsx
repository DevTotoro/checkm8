'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import ChecklistContext from '~/components/contexts/checklist-context';
import { ChecklistItemsForm } from '~/components/forms/checklist/checklist-items-form';
import { api } from '~/trpc/react';
import { copyToClipboard } from '~/lib/utils';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export const ChecklistForm = () => {
  const router = useRouter();

  const { editing, id, title, description, titleError, descriptionError, updateTitle, updateDescription, validate } =
    useContext(ChecklistContext);

  const [isLoading, setIsLoading] = useState(false);

  const createChecklist = api.checklist.create.useMutation({
    onSuccess: ({ slug }) => {
      toast.message('Checklist created', {
        duration: 5000,
        action: {
          label: 'Copy link',
          onClick: () => void copyToClipboard(`${window.location.origin}/checklist/${slug}`),
        },
      });

      router.push('/dashboard');
    },
    onError: (err) => {
      console.error(err);

      toast.error('There was an error creating the checklist');
    },

    onMutate: () => {
      setIsLoading(true);
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  const updateChecklist = api.checklist.update.useMutation({
    onSuccess: ({ slug }) => {
      toast.message('Checklist updated', {
        duration: 5000,
        action: {
          label: 'Copy link',
          onClick: () => void copyToClipboard(`${window.location.origin}/checklist/${slug}`),
        },
      });

      router.refresh();
    },
    onError: (err) => {
      console.error(err);

      toast.error('There was an error updating the checklist');
    },

    onMutate: () => {
      setIsLoading(true);
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = () => {
    const { success, data: checklist } = validate();

    if (!success || !checklist) return;

    editing && id ? updateChecklist.mutate({ checklistId: id, checklist }) : createChecklist.mutate(checklist);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.metaKey || e.ctrlKey) || e.key !== 'Enter') return;

    // If cmd/ctrl + enter is pressed, submit
    e.preventDefault();
    onSubmit();
  };

  return (
    <main onKeyDown={onKeyDown}>
      {/* Header */}
      <div className='mb-6 flex w-full flex-col space-y-2'>
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-2xl font-semibold'>{editing ? 'Edit checklist' : 'Create checklist'}</h2>

          <Button aria-label='Create checklist' className='hidden sm:flex' onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 size-4 animate-spin' aria-hidden='true' />
                Please wait
              </>
            ) : (
              <>
                <Save className='mr-2 size-4' aria-hidden='true' />
                {editing ? 'Save' : 'Create'}
              </>
            )}
          </Button>
          <Button
            aria-label='Create checklist'
            size='icon'
            className='flex sm:hidden'
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className='size-4 animate-spin' aria-hidden='true' />
            ) : (
              <Save className='size-4' aria-hidden='true' />
            )}
          </Button>
        </div>

        <Link href='/dashboard' className='flex w-full items-center space-x-2 text-sm text-muted-foreground'>
          <ArrowLeftIcon className='size-4' />
          <span>Back to dashboard</span>
        </Link>
      </div>

      <div className='flex flex-col space-y-8'>
        {/* Title */}
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='title' className={titleError ? 'text-destructive' : ''}>
            Title
          </Label>
          <Input
            id='title'
            type='text'
            placeholder='Weekly groceries'
            autoFocus
            value={title}
            onChange={(e) => {
              updateTitle(e.target.value);
            }}
          />
          {titleError && <p className='text-[0.8rem] font-medium text-destructive'>{titleError}</p>}
        </div>

        {/* Description */}
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='description' className={descriptionError ? 'text-destructive' : ''}>
            Description
          </Label>
          <Textarea
            id='description'
            placeholder='Buy groceries for the week'
            value={description}
            onChange={(e) => {
              updateDescription(e.target.value);
            }}
          />
          {descriptionError && <p className='text-[0.8rem] font-medium text-destructive'>{descriptionError}</p>}
        </div>
      </div>

      <ChecklistItemsForm />
    </main>
  );
};
