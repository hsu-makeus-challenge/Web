import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/loading-spinner';
import { MovieDetail, MovieCredits, CastMember } from '../types/movie';
import { useCustomFetch } from '../hooks/useCustomFetch';

const DetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);

  // 영화 상세 정보 가져오기
  const {
    data: movie,
    isLoading: isLoadingMovie,
    error: movieError,
  } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    // { method: 'GET' },
    [movieId]
  );

  // 출연진 정보 가져오기
  const {
    data: credits,
    isLoading: isLoadingCredits,
    error: creditsError,
  } = useCustomFetch<MovieCredits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    // { method: 'GET' },
    [movieId]
  );

  // 백드롭 URL 설정
  useEffect(() => {
    if (movie?.backdrop_path) {
      const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
      setBackdropUrl(imageUrl);
    }
  }, [movie]);

  const isLoading = isLoadingMovie || isLoadingCredits;
  const error = movieError || creditsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-3xl font-bold text-red-500 flex justify-center items-center h-screen">
        {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-3xl font-bold text-red-500 flex flex-col justify-center items-center h-screen">
        🚨영화 정보를 찾을 수 없습니다...🚨
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* 배경 이미지 */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0">
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* 영화 정보 */}
        <div className="relative container mx-auto px-4 py-10 flex flex-col justify-end h-full text-gray-400">
          <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
          <p className="mt-4">평균 {movie.vote_average.toFixed(1)}</p>
          <p>{movie.release_date.split('-')[0]}년</p>
          <p>{movie.runtime}분</p>
          {movie.tagline && (
            <p className="text-2xl italic text-gray-300 mt-2">
              {movie.tagline}
            </p>
          )}
          <p className="text-gray-300 max-w-3xl mt-4">{movie.overview}</p>
        </div>
      </div>

      <hr className="w-240" />

      {/* 출연진 정보 */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">출연진</h2>
        <div className="grid grid-cols-10 gap-6">
          {credits?.cast.slice(0, 20).map((actor: CastMember) => (
            <div key={actor.id} className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-2xl">없음ㅎ</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold mt-2 text-center">
                {actor.name}
              </h3>
              <p className="text-xs text-gray-400 text-center">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
