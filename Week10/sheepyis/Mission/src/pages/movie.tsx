import React, { useCallback, useState } from "react";
import ListMovie from "../components/movie/list-movie";
import Search from "../components/search/search";
import { searchMovies } from "../apis/searchAxios";
import type { Movie, MovieSearchParams } from "../types/movie";
import Modal from "../components/modal/modal";

const MoviePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = useCallback(async (params: MovieSearchParams) => {
        const data = await searchMovies(params);
        setMovies(data.results);
    }, []);

    const handleModalClick = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
    }, []);

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <Search onSearch={handleSearch} />
            <ListMovie data={movies} onClick={handleModalClick} />
            
            {selectedMovie && (
                <Modal onClose={handleCloseModal} movie={selectedMovie} />
            )}
        </div>
    );
};

export default MoviePage;
