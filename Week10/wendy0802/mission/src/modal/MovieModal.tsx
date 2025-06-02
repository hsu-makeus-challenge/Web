import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { closeModal, ModalState } from './modalslice';


 const MovieModal = () => {
  const modalState = useSelector((state: RootState): ModalState => state.modal as ModalState);
  const { isOpen, movie } = modalState;
  const dispatch = useDispatch();

  if (!isOpen || !movie) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-hidden">
        <div className="relative h-56 md:h-64 bg-black">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-40 rounded-full w-9 h-9 flex items-center justify-center border border-white"
            onClick={() => dispatch(closeModal())}
          >
            ×
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <div className="text-2xl font-bold drop-shadow">{movie.title}</div>
            {movie.original_title && (
              <div className="text-sm opacity-80">{movie.original_title}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="flex flex-col items-center min-w-[120px]">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-auto rounded shadow mb-2"
            />
            <div className="flex items-end gap-1">
              <span className="text-blue-500 font-bold text-lg">{movie.vote_average?.toFixed(1)}</span>
              <span className="text-gray-400 text-xs mb-0.5">({movie.vote_count} 평가)</span>
            </div>
          </div>
            <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-8 text-sm text-gray-700 mb-2">
              <div>
                <div className="font-semibold text-gray-500">개봉일</div>
                <div>{movie.release_date}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-500">인기도</div>
                <div>{movie.popularity}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-500 mb-1">줄거리</div>
              <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{movie.overview}</div>
            </div>
            <div className="flex gap-2 mt-4">
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
                >
                  IMDb에서 검색
                </a>
              )}
              <button
                onClick={() => dispatch(closeModal())}
                className="border border-gray-300 texㅂ t-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
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