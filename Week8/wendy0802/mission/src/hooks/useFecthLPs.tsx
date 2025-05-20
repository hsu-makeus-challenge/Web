import { useState, useEffect } from 'react';
import { getLPList } from '../api/lp';

export default function useFetchLPs(order: 'asc' | 'desc', page: number) {
  const [lps, setLPs] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    setIsError(false);
    getLPList({ order, limit: 20, cursor: (page - 1) * 20 })
      .then((res) => setLPs(res.data?.data || []))
      .catch(() => setIsError(true))
      .finally(() => setIsPending(false));
  }, [order, page]);

  return { lps, isPending, isError };
}
