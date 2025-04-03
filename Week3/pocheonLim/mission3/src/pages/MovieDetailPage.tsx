import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie, Cast, Crew } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpiner";

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [crew, setCrew] = useState<Crew[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsPending(true);
            try {
                const ACCESS_TOKEN = import.meta.env.VITE_TMDB_KEY;
                const { data } = await axios(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                            "Content-Type": "application/json;charset=utf-8",
                        },
                    }
                );

                const { data: creditsData } = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
                    }
                );

                setMovie(data);
                setCast(creditsData.cast.slice(0, 7));
                setCrew(creditsData.crew.slice(0, 7));

            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    if (isError) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <LoadingSpinner />
            </div>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-full w-full object-cover md:w-96"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {movie.release_date}
                            </div>
                            <h1 className="mt-2 text-3xl font-bold text-gray-900">
                                {movie.title}
                            </h1>
                            <p className="mt-4 text-gray-500">{movie.overview}</p>
                            <div className="mt-4">
                                <span className="text-gray-600">평점: </span>
                                <span className="text-yellow-500 font-bold">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="text-gray-600">추천 수: </span>
                                <span className="text-gray-900">{movie.vote_count}</span>
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