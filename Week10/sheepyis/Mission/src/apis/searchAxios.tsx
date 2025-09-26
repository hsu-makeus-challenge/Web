import { API } from "./axios";
import type { MovieResponse, MovieSearchParams } from "../types/movie";

export const searchMovies = async (params: MovieSearchParams): Promise<MovieResponse> => {
    const response = await API.get<MovieResponse>("/search/movie", {
        params,
    });
    return response.data;
};
