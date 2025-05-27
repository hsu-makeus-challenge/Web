import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies?.map((movie) => (
        <li key={movie.id} className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg transition-transform"
          />
          <article className=" opacity-0 flex flex-col text-white absolute inset-0 justify-center items-center backdrop-blur-md hover:opacity-100">
            <h2 className="font-bold ">{movie.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed mt-2 line-clamp-5">
              {movie.overview}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
