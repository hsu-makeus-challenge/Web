import MovieType from "./MovieType";

type MovieResponse = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

export default MovieResponse;