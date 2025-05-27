import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/loading-spinner';
import { MovieDetail, MovieCredits } from '../types/movie';

const DetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const { data: movieData } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const { data: creditsData } = await axios.get<MovieCredits>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        if (movieData.backdrop_path) {
          const imageUrl = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
          setBackdropUrl(imageUrl);
        }

        setMovie(movieData);
        setCredits(creditsData);
        setError(null);
      } catch (err) {
        setError(
          '🚨영화 상세 정보를 불러오지 못했다. 무언가 잘못된 것이 분명하다...🚨'
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

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
          <div className="absolute inset-0 bg-black/50"></div>{' '}
          {/* 반투명 오버레이 */}
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
          {credits?.cast.slice(0, 20).map((actor) => (
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
