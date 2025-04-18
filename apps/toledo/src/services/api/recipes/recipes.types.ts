import type { User } from '../users/users.types';

export interface Recipe {
  id: string;
  name: string;
  icon?: string;
  url?: string;
  text?: string;
  owner: User;
  guests: User[];
  createdAt: Date;
  updatedAt: Date;
}

export type UpdatedRecipe = Partial<Recipe> & { id: string };
