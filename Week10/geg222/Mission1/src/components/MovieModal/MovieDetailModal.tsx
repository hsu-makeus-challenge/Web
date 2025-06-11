import { JSX } from "react";
import useFetch from "../../hooks/useFetch";
import { MovieDetail } from "../../types/movie";
import MovieDetailContent from "./MovieDetailContent";


interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
}

const MovieDetailModal = ({
  movieId,
  onClose,
}: MovieDetailModalProps): JSX.Element | null => {
  if (!movieId) return null;

  const { data, isLoading, isError } = useFetch<MovieDetail>(
    `/movie/${movieId}?language=ko-KR`
  );

  if (isLoading)
    return <div className="text-white">영화 정보를 불러오는 중입니다...</div>;
  if (isError || !data)
    return <div className="text-red-500">에러가 발생했습니다</div>;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 overflow-auto">
      <div className="bg-zinc-900 text-white rounded-lg w-[90%] max-w-4xl">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt="backdrop"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-400"
            aria-label="Close"
          >
            ×
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl font-extrabold">{data.title}</h2>
            <p className="text-sm text-gray-300">{data.original_title}</p>
          </div>
        </div>
        <MovieDetailContent data={data} onClose={onClose} />
      </div>
    </div>
  );
};

export default MovieDetailModal;
