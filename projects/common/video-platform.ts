import {User} from './user';

export interface VideoPlatform {
  src: string;
  provider: string;
  name: string;
  slug: string;
  description: string;
  comments: {
    user: User,
    text: string
  };
  category: string;
  subCategory: string;
  updatedAt: Date;
  createdAt: Date;
  _v: number;
  _id: string;
}
