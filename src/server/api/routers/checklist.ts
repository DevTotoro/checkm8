import { customAlphabet } from 'nanoid';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import {
  checklistSchema,
  deleteChecklistSchema,
  getChecklistBySlugSchema,
  getUserChecklistsSchema,
  updateChecklistSchema,
} from '~/lib/schemas/checklist.schema';

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

  update: protectedProcedure.input(updateChecklistSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.checklist.update({
      where: { id: input.checklistId },
      data: {
        title: input.checklist.title,
        description: input.checklist.description === '' ? null : input.checklist.description,
        items: {
          deleteMany: {},
          create: input.checklist.items.map((item, index) => ({
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

  getUserChecklists: protectedProcedure.input(getUserChecklistsSchema).query(async ({ ctx, input }) => {
    const take = input.take ?? 20;
    const skip = input.skip ?? 0;

    const data = await ctx.db.checklist.findMany({
      where: { userId: ctx.user.id },
      take,
      skip,
      orderBy: { updatedAt: 'desc' },
    });

    const total = await ctx.db.checklist.count({
      where: { userId: ctx.user.id },
    });

    return {
      data,
      meta: {
        currentPage: Math.floor(skip / take) + 1,
        totalPages: Math.ceil(total / take),
        hasNextPage: skip + take < total,
      },
    };
  }),

  get: protectedProcedure.input(getChecklistBySlugSchema).query(async ({ ctx, input }) => {
    return ctx.db.checklist.findUnique({
      where: { slug: input.slug },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            subItems: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }),

  delete: protectedProcedure.input(deleteChecklistSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.checklist.delete({
      where: { id: input.checklistId },
    });
  }),
});
