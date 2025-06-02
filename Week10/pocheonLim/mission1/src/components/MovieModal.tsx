import { useEffect } from 'react';
import useModalStore from '../store/modalStore';

const MovieModal = () => {
  const { isOpen, selectedMovie, closeModal } = useModalStore();

  const handleIMDBSearch = () => {
    if (selectedMovie) {
      const searchQuery = encodeURIComponent(selectedMovie.title);
      window.open(`https://www.imdb.com/find/?q=${searchQuery}`, '_blank');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !selectedMovie) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div 
        className={`relative max-w-4xl w-[90%] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex gap-8 p-8
          ${selectedMovie.backdrop_path 
            ? 'bg-gradient-to-b from-black/90 to-black/95 text-white'
            : 'bg-white/95 text-gray-800'
          }`}
        style={selectedMovie.backdrop_path ? {
          backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-2xl hover:bg-black/10 transition-colors"
        >
          ×
        </button>

        <div className="flex-[0_0_300px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
          
          <div className="inline-block bg-[#032541] text-white px-4 py-2 rounded-full font-bold mb-4">
            평점: {selectedMovie.vote_average.toFixed(1)} ({selectedMovie.vote_count}명 참여)
          </div>

          <div className="space-y-2 mb-4">
            <div>
              <span className="font-bold mr-2">원제목:</span>
              {selectedMovie.original_title}
            </div>
            <div>
              <span className="font-bold mr-2">개봉일:</span>
              {selectedMovie.release_date}
            </div>
            <div>
              <span className="font-bold mr-2">언어:</span>
              {selectedMovie.original_language.toUpperCase()}
            </div>
            <div>
              <span className="font-bold mr-2">인기도:</span>
              {selectedMovie.popularity.toFixed(0)}
            </div>
          </div>

          <div className="mt-6">
            <span className="font-bold mr-2">줄거리:</span>
            <p className="leading-relaxed opacity-90">
              {selectedMovie.overview || '줄거리 정보가 없습니다.'}
            </p>
          </div>

          <div className="flex gap-4 justify-end mt-8">
            <button
              onClick={handleIMDBSearch}
              className="px-6 py-3 rounded-lg font-bold bg-[#f5c518] text-black hover:bg-[#e6b800] transition-colors flex items-center gap-2"
            >
              IMDB에서 검색
            </button>
            <button
              onClick={closeModal}
              className="px-6 py-3 rounded-lg font-bold border-2 border-current hover:bg-white/10 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;