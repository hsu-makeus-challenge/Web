import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserLpList } from '../../apis/lp';

export const useLpSort = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userLpList', order],
    queryFn: () => fetchUserLpList({ order }),
  });

  return {
    order,
    setOrder,
    data,
    isLoading,
    isError,
    error
  };
}; 