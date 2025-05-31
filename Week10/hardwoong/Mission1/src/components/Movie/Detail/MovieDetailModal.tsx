import { JSX, memo, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import { MovieDetail } from "../../../types/movie";
import MovieDetailBackdrop from "./MovieDetailBackdrop";
import MovieDetailInfo from "./MovieDetailInfo";
import MovieDetailOverview from "./MovieDetailOverview";
import MovieDetailCredits from "./MovieDetailCredits";
import MovieDetailActions from "./MovieDetailActions";

interface MovieDetailModalProps {
  movieId: number | null;
  onClose: () => void;
}

const MovieDetailModal = ({ movieId, onClose }: MovieDetailModalProps): JSX.Element | null => {
  const { data: movie, isPending, isError } = useFetch<MovieDetail>(
    movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`
      : undefined
  );

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!movieId) return null;

  const cast = movie?.credits?.cast?.slice(0, 10) || [];
  const crew = movie?.credits?.crew?.filter((p) => p.job === 'Director') || [];

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-2xl w-full relative shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose} aria-label="닫기">×</button>
        {isPending && <div>로딩 중...</div>}
        {isError && <div>영화 정보를 불러올 수 없습니다.</div>}
        {movie && (
          <>
            <MovieDetailBackdrop movie={movie} />
            <MovieDetailInfo movie={movie} />
            <MovieDetailOverview overview={movie.overview} />
            <MovieDetailCredits crew={crew} cast={cast} />
            <MovieDetailActions imdbId={movie.imdb_id} onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(MovieDetailModal);