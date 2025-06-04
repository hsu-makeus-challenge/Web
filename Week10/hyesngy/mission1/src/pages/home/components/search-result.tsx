import React, { useState } from "react";
import type { Movie } from "@typedefs/movie";
import SearchMovieItem from "./search-movie-item";
import MovieModal from "./movie-modal";
import Pagination from "@components/pagination";
import Spinner from "@components/spinner";
import ErrorFallback from "@components/error-fallback";

interface SearchResultsProps {
	movies: Movie[];
	totalPages: number;
	totalResults: number;
	page: number;
	isLoading: boolean;
	isError: boolean;
	onPageChange: (page: number | ((prev: number) => number)) => void;
}

const SearchResults = React.memo(
	({
		movies,
		totalPages,
		page,
		isLoading,
		isError,
		onPageChange,
	}: SearchResultsProps) => {
		const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

		const handleMovieClick = React.useCallback((movieId: number) => {
			setSelectedMovieId(movieId);
		}, []);

		const handleCloseModal = React.useCallback(() => {
			setSelectedMovieId(null);
		}, []);

		if (isLoading) return <Spinner />;
		if (isError) return <ErrorFallback />;

		if (movies.length === 0) {
			return (
				<div className="text-center py-8">
					<p className="text-gray-400 text-lg">검색 결과가 없습니다.</p>
				</div>
			);
		}

		return (
			<>


				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8">
					{movies.map((movie) => (
						<SearchMovieItem
							key={movie.id}
							movie={movie}
							onMovieClick={handleMovieClick}
						/>
					))}
				</div>

				{totalPages > 1 && <Pagination page={page} setPage={onPageChange} />}

				<MovieModal
					movieId={selectedMovieId || 0}
					isOpen={selectedMovieId !== null}
					onClose={handleCloseModal}
				/>
			</>
		);
	},
);

SearchResults.displayName = "SearchResults";

export default SearchResults;
