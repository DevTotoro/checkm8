import { ChecklistFeed } from '~/components/checklist-feed';

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

const DashboardChecklistFeedPage = ({ searchParams }: Props) => {
  const { take, skip } = searchParams;

  return <ChecklistFeed take={take ? Number(take) : 20} skip={skip ? Number(skip) : 0} />;
};

export default DashboardChecklistFeedPage;
