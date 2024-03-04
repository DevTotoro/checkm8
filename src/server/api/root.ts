import { createTRPCRouter } from '~/server/api/trpc';

import { checklistRouter } from '~/server/api/routers/checklist';

export const appRouter = createTRPCRouter({
  checklist: checklistRouter,
});

export type AppRouter = typeof appRouter;
