import { JSX } from "react";

const MovieDetailActions = ({
  imdbId,
  onClose,
}: {
  imdbId?: string;
  onClose: () => void;
}): JSX.Element => (
  <div className="mt-4 flex justify-end">
    {imdbId && (
      <a
        href={`https://www.imdb.com/title/${imdbId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        IMDb에서 검색
      </a>
    )}
    <button
      className="ml-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
      onClick={onClose}
    >
      닫기
    </button>
  </div>
);

export default MovieDetailActions;