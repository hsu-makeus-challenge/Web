// export interface MovieDataType {
//   id: number;
//   poster_path: string;
//   title: string;
//   overview: string;
//   vote_average: number;
// }

import { string } from 'zod';

// export interface MovieDetailDataType {
//   id: number;
//   runtime: number;
//   vote_average: number;
//   backdrop_path: string;
//   title: string;
//   overview: string;
//   release_date: string;
// }

// export interface CastDataType {
//   id: number;
//   name: string;
//   profile_path: string;
//   original_name: string;
// }

// export interface categoryPageProps {
//   moviesData: MovieDataType[] | undefined;
// }

export interface LpDataType {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: number;
  updatedAt: number;
  tags: object[];
  likes: object[];
}

export interface LpDataProps {
  data: LpDataType[] | undefined;
}

export type ProfileSteps = 'email' | 'password' | 'profile';
