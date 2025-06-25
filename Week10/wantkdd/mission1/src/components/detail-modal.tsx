import { useEffect, useState } from 'react';
import { MovieDetail } from '../types/movie';
import { useCustomFetch } from '../hooks/useCustomFetch';
import { LoadingSpinner } from './loading-spinner';

type Props = {
  movieId: number;
  onClose: () => void;
};

const MovieDetailModal = ({ movieId, onClose }: Props) => {
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);
  const {
    data: movie,
    isLoading,
    error,
  } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    [movieId]
  );

  useEffect(() => {
    if (movie?.backdrop_path) {
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      setBackdropUrl(imageUrl);
    }
  }, [movie]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !movie) return <div className="text-white">에러 발생</div>;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center px-4 overflow-y-auto">
      <div className="relative bg-gray-900 text-white rounded-xl w-full max-w-[800px] my-10 overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute bg-white rounded top-2 right-2 text-xl z-10"
        >
          ❌
        </button>

        {backdropUrl && (
          <div className="relative h-[200px] sm:h-[260px] md:h-[300px] w-full">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-24 sm:w-32 md:w-40 h-auto rounded-md self-center md:self-start shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date} 개봉</p>
            <p className="mt-2">⭐ {movie.vote_average.toFixed(1)}</p>
            <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
              {movie.overview}
            </p>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 px-4 py-2 w-37 bg-yellow-400 text-black font-bold rounded cursor-pointer shadow-lg">
          <a
            href={`https://www.imdb.com/find?q=${encodeURIComponent(
              movie.title || ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDb에서 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
