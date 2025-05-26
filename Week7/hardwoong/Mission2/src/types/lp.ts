import {CommonResponse, CursorBasedResponse} from "./common.ts";
import { Like } from "./Like.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = CommonResponse<Like>;

export type CreateLpRequest = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
  soundcloud: string;
};

export type UpdateLpRequest = {
  title?: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
  published?: boolean;
  soundcloud?: string;
};