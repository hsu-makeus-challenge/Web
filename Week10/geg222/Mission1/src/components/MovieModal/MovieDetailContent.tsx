


import { JSX } from "react";
import { MovieDetail } from "../../types/movie";

interface MovieDetailContentProps {
  data: MovieDetail;
  onClose: () => void;
}

const MovieDetailContent = ({ data, onClose }: MovieDetailContentProps): JSX.Element => {
  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
        className="w-full md:w-[200px] rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="text-base text-blue-400 font-bold">
          평점: {data.vote_average} <span className="text-gray-300">({data.vote_count}명 참여)</span>
        </p>
        <p className="text-sm mt-1">개봉일: <span className="text-gray-300">{data.release_date}</span></p>
        <p className="text-sm mt-1">인기도: <span className="text-gray-300">{data.popularity}</span></p>
        <p className="text-sm mt-1">상영 시간: <span className="text-gray-300">{data.runtime}분</span></p>
        <p className="text-sm mt-1">언어: <span className="text-gray-300 uppercase">{data.original_language}</span></p>
        <p className="text-sm mt-1">관람 등급: <span className="text-gray-300">{data.adult ? "청불" : "전체 관람가"}</span></p>
        <hr className="my-4 border-gray-700" />
        <p className="text-sm leading-relaxed text-gray-200">{data.overview}</p>
        <div className="mt-6 flex gap-2">
          <a
            href={`https://www.imdb.com/title/${data.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            IMDb에서 검색
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailContent;