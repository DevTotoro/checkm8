import { customAlphabet } from 'nanoid';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { checklistSchema } from '~/lib/schemas/checklist.schema';

export const checklistRouter = createTRPCRouter({
  create: protectedProcedure.input(checklistSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.checklist.create({
      data: {
        slug: customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)(),
        userId: ctx.user.id,
        title: input.title,
        description: input.description === '' ? null : input.description,
        items: {
          create: input.items.map((item, index) => ({
            text: item.text,
            order: index,
            subItems: {
              create: item.children.map((child, childIndex) => ({
                text: child.text,
                order: childIndex,
              })),
            },
          })),
        },
      },
    });
  }),
});
