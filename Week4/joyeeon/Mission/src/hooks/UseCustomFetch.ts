import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

interface UseCustomFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

const useCustomFetch = <T>(endpoint: string | null): UseCustomFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const defaultURL : string = "https://api.themoviedb.org/3/movie/"
    const token = import.meta.env.VITE_TMDB_TOKEN;

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(defaultURL+endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return {data, isLoading, error};

};
export default useCustomFetch;