import type { Metadata } from 'next';

import { ChecklistContextProvider } from '~/components/contexts/checklist-context';
import { ChecklistForm } from '~/components/forms/checklist/checklist-form';

export const metadata: Metadata = {
  title: 'checkm8 • Create checklist',
};

const CreateChecklistPage = () => {
  return (
    <div className='mx-auto mt-6 flex w-full max-w-4xl flex-col px-8 sm:px-14'>
      <ChecklistContextProvider>
        <ChecklistForm />
      </ChecklistContextProvider>
    </div>
  );
};

export default CreateChecklistPage;
