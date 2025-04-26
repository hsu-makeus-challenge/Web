import MovieItem from './movieItem';
import { MovieDataType } from '../../type/type';

interface MovieListProps {
  moviesData: MovieDataType[];
}

function MovieList({ moviesData }: MovieListProps) {
  return (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {moviesData.map((movie) => (
        <MovieItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          overview={movie.overview}
        />
      ))}
    </div>
  );
}

export default MovieList;
