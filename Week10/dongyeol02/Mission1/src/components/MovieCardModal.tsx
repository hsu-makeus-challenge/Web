import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <button
          className="absolute top-4 right-4 text-white text-xl z-10"
          onClick={onClose}
        >
          ❌
        </button>
        <div
          className="h-60 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-6">
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-md md:col-span-1"
          />

          <div className="md:col-span-2 space-y-3">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-gray-500 italic">{movie.original_title}</p>

            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold text-lg">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500">
                ({movie.vote_count.toLocaleString()} 평가)
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p>개봉일: {movie.release_date}</p>
              <p>인기: {movie.popularity}</p>
            </div>

            <div className="text-sm mt-2 text-gray-800 leading-relaxed">
              {movie.overview || "줄거리 정보가 없습니다."}
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(
                  movie.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                IMDb에서 검색
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
