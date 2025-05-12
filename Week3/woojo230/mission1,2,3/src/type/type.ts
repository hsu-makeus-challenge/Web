export interface MovieDataType {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

export interface MovieDetailDataType {
  id: number;
  runtime: number;
  vote_average: number;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
}

export interface CastDataType {
  id: number;
  name: string;
  profile_path: string;
  original_name: string;
}

export interface categoryPageProps {
  moviesData: MovieDataType[] | undefined;
}
