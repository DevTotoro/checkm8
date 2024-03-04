import type { Metadata } from 'next';

import { ChecklistContextProvider } from '~/components/contexts/checklist-context';
import { ChecklistForm } from '~/components/forms/checklist/checklist-form';
import { getChecklist } from '~/lib/actions/checklist';

export const metadata: Metadata = {
  title: 'checkm8 • Edit checklist',
};

interface Props {
  params: {
    slug: string;
  };
}

const EditChecklistPage = async ({ params }: Props) => {
  const checklist = await getChecklist({ slug: params.slug });

  return (
    <div className='mx-auto mt-6 flex w-full max-w-4xl flex-col px-8 sm:px-14'>
      <ChecklistContextProvider checklist={checklist}>
        <ChecklistForm />
      </ChecklistContextProvider>
    </div>
  );
};

export default EditChecklistPage;
