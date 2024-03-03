'use server';

import { api } from '~/trpc/server';
import type { GetUserChecklistsSchemaType } from '~/lib/schemas/checklist.schema';

export const getUserChecklists = async ({ take = 20, skip = 0 }: GetUserChecklistsSchemaType) => {
  const { data, meta } = await api.checklist.getUserChecklists.query({
    take,
    skip,
  });

  return {
    data,
    meta,
  };
};
