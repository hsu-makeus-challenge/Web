import { useQuery } from '@tanstack/react-query';
import { MovieDataType } from '../../type/type';
import moviefetchData from '../../apis/movieFetch';
import MovieList from '../../components/movie/movieList';
import LoadingSpinner from '../../components/loading';
import Error from '../../components/error';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import PageBtn from '../../components/pageBtn';

const NowPlayingPage = () => {
  // const {
  //   data: moviesData,
  //   isLoading,
  //   isFetching,
  //   error,
  // } = useQuery<MovieDataType[], Error>({
  //   queryKey: ['now-playing'],
  //   queryFn: () => moviefetchData('now_playing'),
  // });

  const [page, setPage] = useState<number>(1);

  const handleNextPage = () => {
    if (page < (totalPages ?? 1)) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const {
    data: moviesData,
    loading: isLoading,
    error,
    totalPages,
  } = useFetch({ url: `/movie/now_playing`, page });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;
  // if (isFetching) return <LoadingSpinner />;

  return (
    <div>
      <PageBtn
        page={page}
        pageNext={handleNextPage}
        pagePrev={handlePrevPage}
      />
      <MovieList moviesData={moviesData || []} />
    </div>
  );
};

export default NowPlayingPage;
