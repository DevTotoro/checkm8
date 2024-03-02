'use client';

import { useContext } from 'react';
import { Save } from 'lucide-react';

import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import ChecklistContext from '~/components/contexts/checklist-context';
import { ChecklistItemsForm } from '~/components/forms/checklist/checklist-items-form';

export const CreateChecklistForm = () => {
  const { title, description, titleError, descriptionError, updateTitle, updateDescription, validate } =
    useContext(ChecklistContext);

  const onSubmit = () => {
    const { success, data: checklist } = validate();

    if (!success || !checklist) return;

    console.log(checklist);
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
      <div className='mb-6 flex w-full items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Create checklist</h2>

        <Button aria-label='Create checklist' className='hidden sm:flex' onClick={onSubmit}>
          <Save className='mr-2 size-4' aria-hidden='true' />
          Create
        </Button>
        <Button aria-label='Create checklist' size='icon' className='flex sm:hidden' onClick={onSubmit}>
          <Save className='size-4' aria-hidden='true' />
        </Button>
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
