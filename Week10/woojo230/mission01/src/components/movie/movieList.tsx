import MovieItem from './movieItem';
import { MovieDataType } from '../../type/type';
import MovieSearchItem from './movieSearchItem';
import { memo, useMemo } from 'react';

interface MovieListProps {
  moviesData: MovieDataType[];
  isSearch?: boolean;
}

function MovieList({ moviesData, isSearch = false }: MovieListProps) {
  const movieItems = useMemo(() => {
    return moviesData.map((movie) =>
      isSearch ? (
        <MovieSearchItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          overview={movie.overview}
          popularity={movie.popularity}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
          backdrop_path={movie.backdrop_path}
        />
      ) : (
        <MovieItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          overview={movie.overview}
        />
      )
    );
  }, [moviesData, isSearch]);

  return (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movieItems}
    </div>
  );
}

export default memo(MovieList);
