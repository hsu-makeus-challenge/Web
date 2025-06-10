import { useEffect, useState } from 'react';
import { axiosClient } from '../apis/axios.ts';
import { AxiosRequestConfig } from 'axios';

export default function useFetch<T>(url?: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setIsPending(true);
      setIsError(null);

      try {
        const { data } = await axiosClient.get<T>(url, { ...options });
        setData(data);
      } catch {
        setIsError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isPending, isError };
}