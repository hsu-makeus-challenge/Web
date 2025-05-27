import {CursorBasedResponse} from "./common.ts";
import {Author} from "./Author.ts";

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;