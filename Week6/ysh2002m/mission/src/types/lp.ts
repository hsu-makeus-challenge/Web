export interface LpDataType {
	id: number;
	title: string;
	content: string;
	thumbnail: string;
	published: boolean;
	authorId: number;
	createdAt: number;
	updatedAt: number;
	tags: TagType[];
	likes: LikeType[];
  }
  
export interface LpDataProps {
	data: LpDataType[] | undefined;
  }
  
export interface LpDetailDataType {
	id: number;
	title: string;
	content: string;
	thumbnail: string;
	published: boolean;
	authorId: number;
	createdAt: string;
	updatedAt: string;
	author: AuthorType;
	tags: TagType[];
	likes: LikeType[];
  }
  
export interface LpCommentType {
	id: number;
	content: string;
	authorId: number;
	createdAt: string;
	updatedAt: string;
	author: AuthorType;
  }
  
export interface TagType {
	id: number;
	name: string;
  }
  
export interface LikeType {
	id: number;
	userId: number;
	lpId: number;
  }
  
export interface AuthorType {
	id: number;
	name: string;
	email: string;
	bio: string | null;
	avatar: string | null;
	createdAt: string;
	updatedAt: string;
  }
  
export type ProfileSteps = 'email' | 'password' | 'profile';