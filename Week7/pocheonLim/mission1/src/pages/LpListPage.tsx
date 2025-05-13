import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lp } from '../types/lp';
import SkeletonLpCard from '../components/skeleton/SkeletonLpCard';
import { useLpList, LIMIT } from '../hooks/useLpList';

const LpListPage: React.FC = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLpList(order);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleLpClick = (lpId: number) => {
    if (!user) {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인을 해주세요!')) {
        navigate('/login');
      }
      return;
    }
    navigate(`/lp/${lpId}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  const lps = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <div className="p-8">
      <div className="flex justify-end gap-2 mb-4">
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