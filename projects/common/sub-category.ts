import {Category} from './category';

export interface SubCategory {
  createdAt: Date;
  name: string;
  slug: string;
  updatedAt: Date;
  _v: number;
  _id: string;
  parent: Category;
}
