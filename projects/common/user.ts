import {Program} from './program';


export interface User {
  cart: [];
  createdAt: Date;
  email: string;
  name: string;
  role: string;
  updatedAt: Date;
  wishlist: [];
  _v: number;
  _id: string;
  telNum: string;
  address: string[];
  presenceHistory: any[];
  payHistory: any[];
  group: Program;
  picture: string;
  dance: boolean;
}
