import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CastMember, CrewMember, MovieDetails } from "../types/movie";
import axios from "axios";
import MovieInfo from "../components/MovieInfo";
import PersonList from "../components/PersonList";

const MovieDetailPage = (): Element => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetails | null>(null);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const { movieId } = useParams();

  useEffect((): void => {
    const fetchMovieDetail = async (): Promise<void> => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetails>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KO`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovieDetail(data);
        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KO`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCast(creditsRes.data.cast);
        setCrew(creditsRes.data.crew);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }
  return (
    <>
      {!isPending && movieDetail && (
        <div
          className="bg-black backdrop-blur-md
         text-white w-full min-h-screen relative"
        >
          {movieDetail && <MovieInfo moviedetail={movieDetail} />}
          <div className="text-white text-4xl pb-5 pt-5">감독/출현</div>
          <div>
            <PersonList people={crew} />
            <PersonList people={cast} />
          </div>
        </div>
      )}
    </>
  );
};
export default MovieDetailPage;
