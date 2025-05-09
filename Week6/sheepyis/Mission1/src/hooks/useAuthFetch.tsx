import { useState, useEffect } from "react";
import { AuthAPI } from "../apis/authAxios";

export const useAuthFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAPI.get(url);
        setData(response.data);
      } catch (err: any) {
        setError(err);
        if (err.response?.status === 401) {
          console.error('Unauthorized. Redirecting to login...');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
