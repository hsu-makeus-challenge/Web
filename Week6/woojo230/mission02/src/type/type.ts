// Lp 조회회
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

// Lp 상세조회
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

// Lp 댓글조회
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

// 좋아요 타입 정의
export interface LikeType {
  id: number;
  userId: number;
  lpId: number;
}

// 작가 타입 정의
export interface AuthorType {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 회원가입 3단계
export type ProfileSteps = 'email' | 'password' | 'profile';
