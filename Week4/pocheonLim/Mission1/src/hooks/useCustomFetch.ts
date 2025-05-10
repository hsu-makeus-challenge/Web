import { useState, useEffect } from 'react';
import axios from 'axios';

// API 응답 타입을 정의하는 인터페이스
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

// API 요청 옵션을 정의하는 인터페이스
interface FetchOptions {
  endpoint: string;
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
}

export const useCustomFetch = <T>({ endpoint, params = {}, headers = {} }: FetchOptions): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const ACCESS_TOKEN = import.meta.env.VITE_TMDB_KEY;
        
        const defaultHeaders = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json;charset=utf-8",
        };

        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          queryParams.append(key, String(value));
        });
        
        const url = `https://api.themoviedb.org/3${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        
        const response = await axios({
          method: 'GET',
          url,
          headers: { ...defaultHeaders, ...headers },
        });

        setData(response.data);
      } catch (err) {
        console.error('API Error:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, error, isLoading };
};
