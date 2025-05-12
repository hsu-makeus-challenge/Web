import {Like} from "./Like.ts";
import {Tag} from "./Tag.ts";
import {Author} from "./Author.ts";

export interface LpData {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  likes: Like[];
  tags: Tag[];
  author: Author;
  soundcloud: string;
}