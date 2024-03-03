'use server';

import { api } from '~/trpc/server';
import type { GetChecklistBySlugSchemaType, GetUserChecklistsSchemaType } from '~/lib/schemas/checklist.schema';

export const getChecklist = async ({ slug }: GetChecklistBySlugSchemaType) => {
  const data = await api.checklist.get.query({ slug });

  return data;
};

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
