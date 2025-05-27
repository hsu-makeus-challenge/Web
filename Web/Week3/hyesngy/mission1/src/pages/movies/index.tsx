import { useEffect, useState } from "react";
import type { MovieResponse, Movie } from "@typedefs/movie";
import axios from "axios";
import MovieList from "./components/movie-list";

const MoviesPage = () => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const fetchMovies = async () => {
			const { data } = await axios.get<MovieResponse>(
				"https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
					},
				},
			);

			setMovies(data.results);
		};

		fetchMovies();
	}, []);

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieList movies={movies} />
		</div>
	);
};

export default MoviesPage;
