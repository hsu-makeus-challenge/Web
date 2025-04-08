import { useParams } from 'react-router-dom';
import DetailTop from '../components/movie-detail/DetailTop';
import DetailBottom from '../components/movie-detail/DetailBottom';
import { useQuery } from '@tanstack/react-query';
import { CastDataType, MovieDetailDataType } from '../type/type';
import movieDetailfetchData from '../apis/movieDetailFetch';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import movieCastfetchData from '../apis/movieCastFetch';
import useCastFetch from '../hooks/useCastFetch';
import useMovieFetch from '../hooks/useMovieFetch';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const parsedMovieId = movieId ? Number(movieId) : undefined;

  // const {
  //   data: movieData,
  //   isLoading,
  //   isFetching,
  //   error,
  // } = useQuery<MovieDetailDataType, Error>({
  //   queryKey: ['movieDetail', parsedMovieId],
  //   queryFn: () => movieDetailfetchData(parsedMovieId as number),
  // });

  // const {
  //   data: castData,
  //   isLoading: isLoadingCast,
  //   error: castError,
  // } = useQuery<CastDataType[], Error>({
  //   queryKey: ['movieCast', parsedMovieId],
  //   queryFn: () => movieCastfetchData(parsedMovieId as number),
  // });

  const {
    data: castData,
    loading: isLoadingCast,
    error: castError,
  } = useCastFetch({ url: `/movie/${parsedMovieId}/credits` });

  const {
    data: movieData,
    loading: isLoading,
    error,
  } = useMovieFetch({ url: `/movie/${parsedMovieId}` });

  if (isLoading || isLoadingCast) return <LoadingSpinner />;
  if (error || castError) return <Error />;
  // if (isFetching) return <LoadingSpinner />;

  // console.log('Tlqkf', movieData);

  return (
    <div className="p-4">
      <DetailTop data={movieData ?? undefined} />
      <DetailBottom data={castData ?? undefined} />
    </div>
  );
};

export default MovieDetailPage;
