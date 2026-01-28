import { useState } from 'react';

interface MovieDataType {
  posterPath: string | undefined;
  title: string | undefined;
  overview: string | undefined;
  id: number | undefined;
  popularity?: number;
  release_date?: string;
  vote_average?: number;
  backdrop_path?: string;
}

interface MovieDetailModalProps {
  data: MovieDataType;
  onClose?: () => void;
  imageUrl?: string;
  backdropImageUrl?: string;
}

const MovieDetailModal = ({
  data,
  onClose,
  backdropImageUrl,
  imageUrl,
}: MovieDetailModalProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative w-11/12 max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        <button
          className="absolute top-3 right-3 text-white text-2xl bg-transparent border-none cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose && onClose();
          }}
        >
          ×
        </button>

        <div className="relative">
          <img
            className="relative h-60 bg-cover bg-center w-full"
            src={backdropImageUrl || data.backdrop_path}
          />
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t text-white">
            <h1 className="text-xl font-bold m-0">{data.title}</h1>
          </div>
        </div>

        <div className="p-5 overflow-y-auto">
          <div className="flex flex-row gap-5">
            <img className="relative h-80 object-cover w-auto" src={imageUrl} />
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-amber-500 mr-1">
                  {data.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-500 text-sm">
                  ({data.popularity?.toFixed(0)} 평가)
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm text-gray-600 m-0 mb-1">개봉일</h3>
                <p className="m-0 font-bold">{formatDate(data.release_date)}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm text-gray-600 m-0 mb-1">인기도</h3>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        ((data.popularity || 0) / 100) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mb-5 leading-relaxed mt-5">
                <p>{data.overview}</p>
              </div>
              <div className="flex gap-5">
                <button className="px-4 py-2 bg-yellow-400 text-black font-bold rounded cursor-pointer">
                  <a
                    href={`https://www.imdb.com/find?q=${encodeURIComponent(
                      data.title || ''
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IMDb에서 보기
                  </a>
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose && onClose();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
