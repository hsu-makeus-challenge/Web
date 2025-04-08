import Company from "./Company";
import Genre from "./Genre";
import Language from "./Language";

type MovieDetail = {
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

export default MovieDetail;