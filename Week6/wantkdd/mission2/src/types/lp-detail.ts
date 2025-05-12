import { Lp } from './lp';
import { CommonRespense, CursorBasedResponse } from './common';

export interface LpDetailData extends Lp {
  author?: {
    id: number;
    nickname: string;
  };
}

export type LpDetailResponse = CommonRespense<LpDetailData>;

export interface CommentAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

export type CommentsResponse = CursorBasedResponse<Comment[]>;
