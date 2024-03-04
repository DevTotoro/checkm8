import { z } from 'zod';

export type ChecklistItemSchemaType = z.infer<typeof checklistItemSchema>;
const checklistItemSchema = z.object({
  text: z.string().min(3, { message: 'Text must be at least 3 characters long' }),
  children: z
    .array(
      z.object({
        text: z.string().min(3, { message: 'Text must be at least 3 characters long' }),
      }),
    )
    .min(0),
});

export type ChecklistSchemaType = z.infer<typeof checklistSchema>;
export const checklistSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().optional(),
  items: z.array(checklistItemSchema).min(1, { message: 'Checklist must have at least 1 item' }),
});

export const updateChecklistSchema = z.object({
  checklistId: z.string(),
  checklist: checklistSchema,
});

export const getChecklistsSchema = z.object({
  take: z.number().optional(),
  cursor: z.string().optional(),
  search: z.string().optional(),
});

export type GetUserChecklistsSchemaType = z.infer<typeof getUserChecklistsSchema>;
export const getUserChecklistsSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
});

export type GetChecklistBySlugSchemaType = z.infer<typeof getChecklistBySlugSchema>;
export const getChecklistBySlugSchema = z.object({
  slug: z.string(),
});

export type DeleteChecklistSchemaType = z.infer<typeof deleteChecklistSchema>;
export const deleteChecklistSchema = z.object({
  checklistId: z.string(),
});
