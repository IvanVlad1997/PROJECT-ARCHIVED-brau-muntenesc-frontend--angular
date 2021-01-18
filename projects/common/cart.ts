import {Product} from './product';

export interface Cart {
  product: Product;
  count: number;
  description: string;
  _id: string;
}
