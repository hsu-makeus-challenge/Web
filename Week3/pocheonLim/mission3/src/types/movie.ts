export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres?: { id: number; name: string }[];
    runtime?: number;
    status?: string;
    tagline?: string;
    budget?: number;
    revenue?: number;
};

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type Cast = {
    id: number;
    name: string;
    original_name: string;
    profile_path: string | null;
    character: string;
};

export type Crew = {
    id: number;
    name: string;
    original_name: string;
    profile_path: string | null;
    job: string;
};

export type Credits = {
    id: number;
    cast: Cast[];  // 출연진
    crew: Crew[];  // 제작진
};