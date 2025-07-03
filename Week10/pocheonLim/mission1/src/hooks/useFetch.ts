import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig): { data: T | null, error: string | null, isLoading: boolean } => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const { data } = await axiosClient.get(url, {
                    ...options,
                });

                setData(data);
            } catch {
                setError("데이터 패치 오류");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, error, isLoading };
};

export default useFetch;