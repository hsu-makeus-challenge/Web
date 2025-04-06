import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import NotFoundPage from "./NotFoundPage";

const MovieDetailPage = (): JSX.Element => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        setIsError(true);
        console.error("영화 상세 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId, apiKey]);

  // 로딩 중, 오류 처리
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <NotFoundPage />;

  // 개봉년도와 러닝타임 
  const releaseYear = movieDetails.release_date?.split("-")[0]; // 개봉년도 
  const runtime = movieDetails.runtime; // 러닝타임 

  // 감독 정보 가져오기
  const director = movieDetails.credits?.crew?.find(
    (person: any) => person.job === "Director"
  );

  return (
    <div className="movie-detail-container p-6 bg-black text-white">
      <div className="relative">

        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-full h-[500px] object-cover rounded-lg mb-4 filter blur-sm"
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
          <p className="text-lg mt-2">{releaseYear}</p>
          <p className="text-lg mt-2">{runtime}분</p> 
          <p className="text-lg mt-2">{movieDetails.vote_average}</p>
          <p className="mt-4">{movieDetails.overview}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">감독</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
          {movieDetails.credits?.crew
            ?.filter((member: any) => member.job === "Director")
            .map(({ id, name, profile_path }: any) => (
              <div key={id} className="actor-card flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <p className="text-center font-semibold">{name}</p>
                <p className="text-center text-sm text-gray-500">감독</p>
              </div>
            ))}
        </div>
      </div>


      <div className="mt-4">
        <h2 className="text-2xl font-semibold">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
          {movieDetails.credits?.cast?.map(
            ({ id, name, profile_path, character }: any) => (
              <div key={id} className="actor-card flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <p className="text-center font-semibold">{name}</p>
                <p className="text-center text-sm text-gray-500">{character}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
