'use client';

import { createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Prisma } from '@prisma/client';

import {
  checklistSchema,
  type ChecklistItemSchemaType,
  type ChecklistSchemaType,
} from '~/lib/schemas/checklist.schema';

export interface ChecklistItem extends Omit<ChecklistItemSchemaType, 'children'> {
  id: string;
  shouldFocus?: boolean;
  children: (Omit<ChecklistItemSchemaType, 'children'> & { id: string; shouldFocus?: boolean })[];
}

interface ChecklistContextType {
  id?: string;
  title: string;
  description: string;
  items: ChecklistItem[];

  titleError: string;
  descriptionError: string;
  itemsError: string;

  editing: boolean;

  validate: () => { success: boolean; data?: ChecklistSchemaType };

  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;

  addItem: (id?: string) => void;
  removeItem: (id: string) => void;
  updateItemText: (id: string, text: string) => void;
  updateItemOrder: (id: string, targetId: string) => void;

  addChild: (itemId: string, childId?: string) => void;
  removeChild: (childId: string) => void;
  updateChildText: (childId: string, text: string) => void;
}

const initialState: ChecklistContextType = {
  id: undefined,
  title: '',
  description: '',
  items: [
    {
      id: nanoid(6),
      text: '',
      children: [],
    },
  ],

  titleError: '',
  descriptionError: '',
  itemsError: '',

  editing: false,

  validate: () => ({ success: false, data: undefined }),

  updateTitle: () => void 0,
  updateDescription: () => void 0,

  addItem: () => void 0,
  removeItem: () => void 0,
  updateItemText: () => void 0,
  updateItemOrder: () => void 0,

  addChild: () => void 0,
  removeChild: () => void 0,
  updateChildText: () => void 0,
};

const ChecklistContext = createContext<ChecklistContextType>(initialState);

type ChecklistWithRelations = Prisma.ChecklistGetPayload<{
  include: { items: { include: { subItems: true } } };
}> | null;

interface Props {
  children: React.ReactNode;
  checklist?: ChecklistWithRelations;
}

export const ChecklistContextProvider = ({ children, checklist }: Props) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState(initialState.title);
  const [description, setDescription] = useState(initialState.description);
  const [items, setItems] = useState<ChecklistItem[]>(initialState.items);

  const [titleError, setTitleError] = useState(initialState.titleError);
  const [descriptionError, setDescriptionError] = useState(initialState.descriptionError);
  const [itemsError, setItemsError] = useState(initialState.itemsError);

  useEffect(() => {
    if (!checklist) return;

    setId(checklist.id);
    setTitle(checklist.title);
    setDescription(checklist.description ?? '');

    setItems(
      checklist.items.map((item) => ({
        id: item.id,
        text: item.text,
        children: item.subItems.map((child) => ({ id: child.id, text: child.text })),
      })),
    );
  }, [checklist]);

  const validate = () => {
    setTitleError('');
    setDescriptionError('');
    setItemsError('');

    const checklist: ChecklistSchemaType = {
      title,
      description,
      items: items.map(({ text, children }) => ({
        text,
        children: children.map(({ text }) => ({ text })),
      })),
    };

    const res = checklistSchema.safeParse(checklist);

    if (!res.success) {
      for (const error of res.error.errors) {
        if (error.path.some((path) => path === 'title')) {
          setTitleError(error.message);
        }

        if (error.path.some((path) => path === 'description')) {
          setDescriptionError(error.message);
        }

        if (error.path.some((path) => path === 'items')) {
          setItemsError(error.message);
        }
      }
    }

    return { success: res.success, data: res.success ? checklist : undefined };
  };

  const updateTitle = (title: string) => {
    setTitleError('');

    setTitle(title);
  };

  const updateDescription = (description: string) => {
    setDescriptionError('');

    setDescription(description);
  };

  const addItem = (id?: string) => {
    setItemsError('');

    setItems((prev) => {
      // If no id is provided, add to the end
      const index = id ? prev.findIndex((item) => item.id === id) : prev.length - 1;

      const newItems = [...prev];

      newItems.splice(index + 1, 0, {
        id: nanoid(6),
        text: '',
        children: [],
        shouldFocus: true,
      });

      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItemsError('');

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItemText = (id: string, text: string) => {
    setItemsError('');

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  /**
   * Move the item with the id right after the targetId
   * @param id - The id of the item to move
   * @param targetId - The id of the item to move after
   */
  const updateItemOrder = (id: string, targetId: string) => {
    if (id === targetId) return;

    setItems((prev) => {
      const newItems = [...prev];

      const index = newItems.findIndex((item) => item.id === id);
      const item = newItems.splice(index, 1)[0];
      if (!item) return prev;

      const targetIndex = newItems.findIndex((item) => item.id === targetId);
      if (targetIndex === -1) return prev;

      newItems.splice(targetIndex + 1, 0, item);

      return newItems;
    });
  };

  const addChild = (itemId: string, id?: string) => {
    setItemsError('');

    setItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.id === itemId);
      const item = prev[itemIndex];
      if (!item) return prev;

      const newItems = [...prev];

      const childIndex = id ? item.children.findIndex((child) => child.id === id) : item.children.length - 1;

      const newChildren = [...item.children];
      newChildren.splice(childIndex + 1, 0, {
        id: nanoid(6),
        text: '',
        shouldFocus: true,
      });

      newItems[itemIndex] = {
        ...item,
        children: newChildren,
      };

      return newItems;
    });
  };

  const removeChild = (id: string) => {
    setItemsError('');

    setItems((prev) => prev.map((item) => ({ ...item, children: item.children.filter((child) => child.id !== id) })));
  };

  const updateChildText = (id: string, text: string) => {
    setItemsError('');

    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        children: item.children.map((child) => (child.id === id ? { ...child, text } : child)),
      })),
    );
  };

  return (
    <ChecklistContext.Provider
      value={{
        id,
        title,
        description,
        items,

        titleError,
        descriptionError,
        itemsError,

        editing: !!checklist,

        validate,

        updateTitle,
        updateDescription,

        addItem,
        removeItem,
        updateItemText,
        updateItemOrder,

        addChild,
        removeChild,
        updateChildText,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export default ChecklistContext;
