import { useState, JSX, useEffect } from 'react';
import { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard'; 
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import ArrowButton from '../components/ArrowButton';

export default function MoviePage(): JSX.Element {
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();

  useEffect(() => {
    setPage(1);
  }, [category])

  const url = `https://api.themoviedb.org/3/movie/${category}?&language=en-US&page=${page}`

  const { data: movies, isPending, isError } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span> 
      </div>
    );
  }

  if (isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  
  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <ArrowButton
          disabled={page === 1}
          label="이전"  
          onClick={() => setPage(prev => prev - 1)}
          direction="prev"
        />
        <span>{page} 페이지</span>
        <ArrowButton
          label="다음"  
          onClick={() => setPage(prev => prev + 1)}
          direction="next"
        />
      </div>
      {isPending && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}
      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      )}
    </>
  );
}