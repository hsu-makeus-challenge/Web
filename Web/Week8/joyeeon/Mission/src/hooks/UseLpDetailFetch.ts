import { api } from "../apis/api";
import { useEffect } from "react";
import { useState } from "react";

interface UseLPDetailFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

const useLPDetailFetch = <T>(endpoint: string | null): UseLPDetailFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(endpoint, {
                });
                setData(response.data.data);
                console.log("lp디테일 값",response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return {data, isLoading, error};
}

export default useLPDetailFetch;