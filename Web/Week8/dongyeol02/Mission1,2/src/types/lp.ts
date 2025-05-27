import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
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
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type RequestLpDto = {
  lpId: number;
};
export type ResponseLpDto = CommonResponse<Lp>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type ResponseCreateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;
