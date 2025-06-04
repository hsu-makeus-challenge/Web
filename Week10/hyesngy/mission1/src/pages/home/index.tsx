import React, { useCallback } from "react";
import MovieList from "@pages/movies/components/movie-list";
import MovieSearchForm from "./components/movie-search-form";
import SearchResults from "./components/search-result";
import { useMovieSearch } from "@hooks/use-movie-search";

interface SearchFormData {
	query: string;
	includeAdult: boolean;
	language: string;
}

const HomePage = () => {
	const {
		searchParams,
		updateSearchParams,
		setPage,
		movies: searchMovies,
		totalPages,
		totalResults,
		isLoading: isSearchLoading,
		isError: isSearchError,
		hasSearched,
	} = useMovieSearch();

	const handleSearch = useCallback(
		(searchData: SearchFormData) => {
			updateSearchParams(searchData);
		},
		[updateSearchParams],
	);

	const handlePageChange = useCallback(
		(page: number | ((prev: number) => number)) => {
			if (typeof page === 'function') {
				setPage(page(searchParams.page));
			} else {
				setPage(page);
			}
		},
		[setPage, searchParams.page],
	);

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<MovieSearchForm onSearch={handleSearch} isLoading={isSearchLoading} />

			{hasSearched ? (
				<SearchResults
					movies={searchMovies}
					totalPages={totalPages}
					totalResults={totalResults}
					page={searchParams.page}
					isLoading={isSearchLoading}
					isError={isSearchError}
					onPageChange={handlePageChange}
				/>
			) : (
				<PopularMovies />
			)}
		</div>
	);
};

const PopularMovies = React.memo(() => {
	return <MovieList category="popular" />;
});

PopularMovies.displayName = "PopularMovies";

export default HomePage;
