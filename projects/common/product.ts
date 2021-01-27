import {SubCategory} from './sub-category';
import {Category} from './category';

export interface Product {
  _id: string;
  subCategory: SubCategory[];
  ratings: any[];
  sold: number;
  images: any[];
  title: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
  shipping: string;
  color: string;
  brand: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}
