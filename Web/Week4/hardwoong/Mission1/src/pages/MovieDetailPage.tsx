import { JSX } from 'react';
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetail } from '../types/movie';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams();
  const { data: movie, isPending, isError } = useCustomFetch<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,
    'ko-KR'
  );

  if (isPending) return <LoadingSpinner />;
  if (isError || !movie) return <div className="text-center text-red-500 py-10">영화 정보를 불러올 수 없습니다.</div>;

  const cast = movie.credits?.cast?.slice(0, 20) || [];
  const crew = movie.credits?.crew?.filter((p) => p.job === 'Director') || [];

  return (
    <div className="text-white bg-black min-h-screen w-full">
      <div className="relative w-full h-[590px] flex items-end p-4">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50 absolute top-0 left-0 z-0"
        />
        <div className="p-4 relative z-10">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-sm mt-1">평균 {movie.vote_average}</p>
          <p className="text-sm mt-1">{movie.release_date?.split('-')[0]}</p>
          <p className="text-sm mt-1">{movie.runtime}분</p>
          {movie.tagline && <p className="italic mt-2">{movie.tagline}</p>}
          <p className="mt-3 text-sm w-90">{movie.overview}</p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex flex-wrap gap-4">
          {[...crew, ...cast].map((person) => (
            <div key={person.id} className="w-24 text-center">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="w-24 h-24 object-cover border rounded-full mb-1"
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