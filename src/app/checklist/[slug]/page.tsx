import { getChecklist } from '~/lib/actions/checklist';
import { ChecklistForm } from '~/components/checklist-form';

interface Props {
  params: {
    slug: string;
  };
}

const ChecklistPage = async ({ params }: Props) => {
  const checklist = await getChecklist({ slug: params.slug });

  return (
    <main className='flex w-full max-w-lg flex-col space-y-16'>
      {checklist && <ChecklistForm checklist={checklist} />}
    </main>
  );
};

export default ChecklistPage;
