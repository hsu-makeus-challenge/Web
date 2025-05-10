import { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieDataType } from '../type/type';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = import.meta.env.VITE_MOVIE_API_URL;

interface FetchParams {
  url: string;
  page: number;
}

const useFetch = ({ url, page }: FetchParams) => {
  const [data, setData] = useState<MovieDataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          params: { language: 'ko-KR', page: page },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const movieData = response.data.results || [];
        const totalPage = response.data.total_pages;
        setData(movieData);
        setTotalPages(totalPage);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page]);

  return { data, totalPages, loading, error };
};

export default useFetch;
