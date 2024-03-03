'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { api } from '~/trpc/react';

interface Props {
  children: React.ReactNode;
  checklistId: string;
}

export const ChecklistDeleteConfirmDialog = ({ children, checklistId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const deleteChecklist = api.checklist.delete.useMutation({
    onSuccess: () => {
      toast.success('Checklist deleted successfully');
      router.refresh();
    },

    onError: (err) => {
      console.error(err);
      toast.error('There was an error deleting the checklist');
    },

    onMutate: () => {
      setIsLoading(true);
    },

    onSettled: () => {
      setIsLoading(false);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the checklist and all of its items.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => {
              deleteChecklist.mutate({ checklistId });
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 size-4' />
                Please wait
              </>
            ) : (
              <>Continue</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
