import { useState, useCallback, useMemo } from "react";
import { useFetch } from "./use-fetch";
import type { MovieResponse } from "@typedefs/movie";

interface SearchParams {
	query: string;
	includeAdult: boolean;
	language: string;
	page: number;
}

export const useMovieSearch = () => {
	const [searchParams, setSearchParams] = useState<SearchParams>({
		query: "",
		includeAdult: false,
		language: "ko-KR",
		page: 1,
	});

	const searchUrl = useMemo(() => {
		if (!searchParams.query.trim()) return undefined;

		const params = new URLSearchParams({
			query: searchParams.query,
			include_adult: searchParams.includeAdult.toString(),
			language: searchParams.language,
			page: searchParams.page.toString(),
		});

		return `/search/movie?${params.toString()}`;
	}, [searchParams]);

	const { data, isLoading, isError } = useFetch<MovieResponse>(searchUrl);

	const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
		setSearchParams((prev) => ({ ...prev, ...newParams, page: 1 }));
	}, []);

	const setPage = useCallback((page: number) => {
		setSearchParams((prev) => ({ ...prev, page }));
	}, []);

	return {
		searchParams,
		updateSearchParams,
		setPage,
		movies: data?.results || [],
		totalPages: data?.total_pages || 0,
		totalResults: data?.total_results || 0,
		isLoading,
		isError,
		hasSearched: !!searchParams.query.trim(),
	};
};
