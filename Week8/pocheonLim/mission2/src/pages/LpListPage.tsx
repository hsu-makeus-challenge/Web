import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lp } from '../types/lp';
import SkeletonLpCard from '../components/skeleton/SkeletonLpCard';
import { useLpList, LIMIT } from '../hooks/lp/queries/useLpList';
import useDebounce from '../hooks/utils/useDebounce';
import useThrottle from '../hooks/utils/useThrottle';

const LpListPage: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 3000);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpList(order, debouncedSearch);

  // fetchNextPage 호출 여부를 throttle된 값으로 관리
  const [shouldFetch, setShouldFetch] = useState(false);
  const throttledShouldFetch = useThrottle(shouldFetch, 1000); // 1초에 한 번만 true로 바뀜

  useEffect(() => {
    if (throttledShouldFetch) {
      fetchNextPage();
      setShouldFetch(false);
    }
  }, [throttledShouldFetch, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        setShouldFetch(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const handleLpClick = (lpId: number) => {
    if (!user) {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인을 해주세요!')) {
        navigate('/login');
      }
      return;
    }
    navigate(`/lp/${lpId}`);
  };
  if (isError) return <div>에러 발생: {error?.message}</div>;

  const lps = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="LP 제목으로 검색..."
          className="flex-1 max-w-xs px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder-gray-400"
        />
        <div className="flex gap-2 ml-4">
          <button
            className={`px-4 py-2 rounded ${order === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setOrder('asc')}
          >
            오래된순
          </button>
          <button
            className={`px-4 py-2 rounded ${order === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setOrder('desc')}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {lps.length === 0 && <div>LP가 없습니다.</div>}
        {lps.map((lp: Lp) => (
          <div
            key={lp.id}
            onClick={() => handleLpClick(lp.id)}
            className="relative cursor-pointer bg-[#232b3b] rounded shadow flex flex-col items-center overflow-hidden transition-transform duration-200 hover:scale-105 group"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full aspect-square object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            {/* 하단 정보 영역 */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div>
                <div className="text-white text-base font-bold mb-1">{lp.title}</div>
                <div className="text-gray-200 text-xs">{new Date(lp.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-1 text-white text-sm mb-1">
                <span>♥</span>
                <span>{lp.likes?.length ?? 0}</span>
              </div>
            </div>
          </div>
        ))}

        {isFetchingNextPage &&
          Array.from({ length: LIMIT }).map((_, idx) => (
            <SkeletonLpCard key={`skeleton-${idx}`} />
          ))}
      </div>
    </div>
  );
};

export default LpListPage; 