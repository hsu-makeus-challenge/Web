import { useState, useEffect } from 'react';
import axios from 'axios';
import { CastDataType } from '../type/type';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_API_URL;

interface FetchParams {
  url: string;
}

const useCastFetch = ({ url }: FetchParams) => {
  const [data, setData] = useState<CastDataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          params: { language: 'ko-KR' },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const movieData = response.data.cast || [];
        setData(movieData);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useCastFetch;
