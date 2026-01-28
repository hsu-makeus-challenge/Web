import { useState, memo, useCallback } from 'react';
import MovieDetailModal from './MovieDetailModal';

interface MovieItemProps {
  posterPath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
  id: number | undefined;
  popularity?: number;
  release_date?: string;
  vote_average?: number;
  backdrop_path?: string;
}

const MovieSearchItem = ({ id: movieId, ...data }: MovieItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500${data.posterPath}`;
  const backdropImageUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer "
      onClick={() => setIsModalOpen((prev) => !prev)}
    >
      <img src={imageUrl} alt={data.title} />

      <div className="flex flex-col justify-center items-center overflow-y-auto text-white p-4">
        <h2 className="text-lg font-bold text-center leading-snug text-black mb-2">
          {data.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{data.release_date}</p>
        <p className="text-sm text-black line-clamp-3">{data.overview}</p>
      </div>

      {isModalOpen && (
        <MovieDetailModal
          key={movieId}
          backdropImageUrl={backdropImageUrl}
          imageUrl={imageUrl}
          data={{ ...data, id: movieId }}
          onClose={() => setIsModalOpen((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default memo(MovieSearchItem);
