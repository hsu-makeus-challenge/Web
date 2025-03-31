import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid';
import { Movie } from '../types/movie';

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDk0MzhhY2JmZWRhMGQ5ZWIyYjk3ODI4NzRjOTdlZCIsIm5iZiI6MTc0MzA0NzQwMC4zODcsInN1YiI6IjY3ZTRjYWU4NDIxZWI4YzMzMWJhMmYyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lY6hn_pEOwUHsRjD8vBWKgcM93QNIPVUgsy-izcUcVw`, // 🔑 여기에 본인 토큰
              accept: 'application/json',
            },
          }
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return <MovieGrid movies={movies} />;
};

export default MoviePage;