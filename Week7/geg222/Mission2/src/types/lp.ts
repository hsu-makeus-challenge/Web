import { CommonResponse, CursorBasedResponse } from "./common.ts";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  name: string;
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

export type ResponseLpDto = CommonResponse<Lp>;

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LpComment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseLpCommentListDto = CursorBasedResponse<LpComment[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestLpDto = {
  lpId: number;
};

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
};

// LP 수정 (PATCH) 요청 DTO
export type RequestUpdateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// LP 수정 (PATCH) 응답 DTO
export type ResponseUpdateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}>;

// 댓글 수정 (PATCH) 요청 DTO
export type RequestUpdateCommentDto = {
  content: string;
};

// 댓글 수정 (PATCH) 응답 DTO
export type ResponseUpdateCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}>;

// 댓글 삭제 (DELETE) 응답 DTO
export type ResponseDeleteCommentDto = CommonResponse<{
  message: string;
}>;

