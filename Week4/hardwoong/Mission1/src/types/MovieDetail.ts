export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
  tagline: string;
  production_companies: Company[];
  spoken_languages: Language[];
};

type Company = { id: number; name: string; logo_path: string | null };

type Genre = { id: number; name: string };

type Language = { english_name: string };

export type CastMember = {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
};

export type CrewMember = {
  id: number;
  name: string;
  profile_path: string | null;
  job: string;
};