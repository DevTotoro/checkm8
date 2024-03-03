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

export type GetUserChecklistsSchemaType = z.infer<typeof getUserChecklistsSchema>;
export const getUserChecklistsSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
});

export const deleteChecklistSchema = z.object({
  checklistId: z.string(),
});
