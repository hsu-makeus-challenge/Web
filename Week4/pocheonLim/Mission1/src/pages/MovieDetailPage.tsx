import React from "react";
import { useParams } from "react-router-dom";
import { Movie, Cast, Crew } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpiner";
import { ErrorFallback } from "../components/ErrorFallback";
import { useCustomFetch } from "../hooks/useCustomFetch";

// 영화 상세 정보 응답 타입 정의
interface MovieDetailResponse extends Movie {
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
}

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data: movieData, error: movieError, isLoading: movieLoading } = useCustomFetch<MovieDetailResponse>({
    endpoint: `/movie/${movieId}`,
    params: {
      language: 'ko-KR',
      append_to_response: 'credits'
    }
  });

  if (movieError) {
    return <ErrorFallback message={movieError} />;
  }

  if (movieLoading || !movieData) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  const { credits } = movieData;
  const cast = credits?.cast.slice(0, 7) || [];
  const crew = credits?.crew.slice(0, 7) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-full w-full object-cover md:w-96"
                src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {movieData.release_date}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {movieData.title}
              </h1>
              <p className="mt-4 text-gray-500">{movieData.overview}</p>
              <div className="mt-4">
                <span className="text-gray-600">평점: </span>
                <span className="text-yellow-500 font-bold">
                  {movieData.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-gray-600">추천 수: </span>
                <span className="text-gray-900">{movieData.vote_count}</span>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900">출연</h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="flex flex-col items-center w-24">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={actor.profile_path 
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
                          : "https://via.placeholder.com/100"}
                        alt={actor.name}
                      />
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-500">{actor.character}</p>
                    </div>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-8">제작진</h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {crew.map((staff) => (
                    <div key={staff.id} className="flex flex-col items-center w-24">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={staff.profile_path 
                          ? `https://image.tmdb.org/t/p/w200${staff.profile_path}` 
                          : "https://via.placeholder.com/100"}
                        alt={staff.name}
                      />
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        {staff.name}
                      </p>
                      <p className="text-xs text-gray-500">{staff.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;