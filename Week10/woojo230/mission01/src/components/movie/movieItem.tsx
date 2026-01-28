import { useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieItemProps {
  posterPath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
  id: number | undefined;
}

const MovieItem = ({
  id: movieId,
  posterPath,
  title,
  overview,
}: MovieItemProps) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const gotoDetailPage = useCallback((): void => {
    navigate(`/movies/${movieId}`);
  }, [navigate, movieId]);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={gotoDetailPage}
    >
      <img src={imageUrl} alt={title} />
      {isHover && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                    backdrop-blur-md flex flex-col justify-center items-center overflow-y-auto text-white p-4"
        >
          <h2 className="text-lg font-bold text-center leading-snug">
            {title}
          </h2>
          <p className="text-sm text-gray-300 break-words leading-relaxed mt-2 line-clamp-5">
            {overview}
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(MovieItem);
