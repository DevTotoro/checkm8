import Dexie, { Table } from 'dexie';

export enum ItemStatus {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
}

export interface IndexDBChecklist {
  id: string;
  items: {
    itemId: string;
    status: ItemStatus;
    subItems: {
      subItemId: string;
      status: ItemStatus;
    }[];
  }[];
}

export class Checkm8IndexDB extends Dexie {
  checklists!: Table<IndexDBChecklist>;

  constructor() {
    super('checkm8');

    this.version(1).stores({
      checklists: 'id',
    });
  }
}

export const db = new Checkm8IndexDB();
