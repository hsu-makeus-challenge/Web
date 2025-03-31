import { JSX, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieDetail from '../types/MovieDetail';
import CastMember from '../types/CastMember';
import CrewMember from '../types/CrewMember';

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async (): Promise<void> => {
      setLoading(true);
      try {
        const [detailResult, creditResult] = await Promise.allSettled([
          axios.get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDk0MzhhY2JmZWRhMGQ5ZWIyYjk3ODI4NzRjOTdlZCIsIm5iZiI6MTc0MzA0NzQwMC4zODcsInN1YiI6IjY3ZTRjYWU4NDIxZWI4YzMzMWJhMmYyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY6hn_pEOwUHsRjD8vBWKgcM93QNIPVUgsy-izcUcVw`,
              accept: 'application/json',
            },
          }),
          axios.get<{ cast: CastMember[]; crew: CrewMember[] }>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDk0MzhhY2JmZWRhMGQ5ZWIyYjk3ODI4NzRjOTdlZCIsIm5iZiI6MTc0MzA0NzQwMC4zODcsInN1YiI6IjY3ZTRjYWU4NDIxZWI4YzMzMWJhMmYyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY6hn_pEOwUHsRjD8vBWKgcM93QNIPVUgsy-izcUcVw`,
              accept: 'application/json',
            },
          }),
        ]);
  
        if (detailResult.status === 'fulfilled') {
          setMovie(detailResult.value.data);
        } else {
          setError('영화 상세 정보를 불러오는데 실패했습니다.');
        }
  
        if (creditResult.status === 'fulfilled') {
          const castData = creditResult.value.data.cast.slice(0, 20);
          const crewData = creditResult.value.data.crew.filter((p: any) => p.job === 'Director');
          setCast(castData);
          setCrew(crewData);
        } else {
          setError('감독/출연진 정보를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('데이터를 불러오는 도중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div className="text-center py-10 mt-10 text-gray-400">영화 정보를 찾을 수 없습니다.</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="text-white bg-black min-h-screen w-full">
      {/* 배경 이미지 */}
      <div
        className="w-full h-[590px] bg-cover bg-top flex items-end p-4 mt-14"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="p-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-sm mt-1">평균 {movie.vote_average}</p>
          <p className="text-sm mt-1">{movie.release_date.split('-')[0]}</p>
          <p className="text-sm mt-1">{movie.runtime}분</p>
          {movie.tagline && <p className="italic mt-2">{movie.tagline}</p>} {/* movie.tagline이 존재할 때 출력 */}
          <p className="mt-3 text-sm w-90">{movie.overview}</p>
        </div>
      </div>

      {/* 감독/출연 */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex flex-wrap gap-4">
          {[...crew, ...cast].map((person) => (
            <div key={person.id} className="w-24 text-center">
              {person.profile_path ? (
              // 감독/출연자의 이미지가 없을 때 이미지 처리를 위해 케이스 분리
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="w-24 h-24 object-cover border rounded-full mb-1"
                  // object-cover: 이미지가 비율을 유지한 채 요소를 꽉 채움 (이미지가 잘리지 않도록)
                />
              ) : (
                <div className="w-24 h-24 rounded-full border text-white flex items-center justify-center text-xs mb-1">
                  {person.name}
                </div>
              )}
              <p className="text-xs font-bold">{person.name}</p>
              {'character' in person && <p className="text-xs text-gray-400">{person.character}</p>}
              {'job' in person && <p className="text-xs text-gray-400">{person.job}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
