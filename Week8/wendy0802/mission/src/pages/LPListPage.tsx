import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LPCard from '../components/LPCard';
import Navbar from '../components/Navbar';
import SkeletonCard from '../components/SkeletonCard';
import FloatingButton from '../components/FloatingButton';
import { useAuth } from '../context/AuthContext';
import AddLPModal from '../components/AddLPModal';
import { axiosInstance } from '../api/axios';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/key';

const LPListPage = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteLpList({ order, limit: 20 });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (error?.message?.includes('인증이 필요합니다')) {
      logout();
      navigate('/login');
    }
  }, [error, logout, navigate]);

  const handleOpenModal = () => {
    if (!accessToken) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      await axiosInstance.post('/v1/lps', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LP_LIST] });
      
      setIsModalOpen(false);
      alert('LP가 성공적으로 등록되었습니다!');
    } catch (error: any) {
      console.error('LP 등록 실패:', error);
      alert(error.response?.data?.message || 'LP 등록에 실패했습니다.');
    }
  };

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-red-500 text-xl mb-4">
        {error instanceof Error ? error.message : "에러가 발생했습니다"}
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        새로고침
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 w-full z-50 bg-black shadow-md">
        <Navbar />
      </nav>
      <main className="pt-16">
        <div className="p-1">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-500">LP</h1>
          <div className="flex justify-center gap-1 mb-6">
            <button
              onClick={() => setOrder('desc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'desc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
              disabled={isLoading}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder('asc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'asc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
              disabled={isLoading}
            >
              최신순
            </button>
          </div>
          <div className="max-w-[1200px] mx-auto p-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {data?.pages?.flatMap((page) =>
                page?.data?.data?.map((lp: any) => (
                  <LPCard 
                    key={lp.id} 
                    lp={lp} 
                  />
                )) ?? []
              ) ?? []}
              {(isLoading || isFetchingNextPage) && 
                Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              }
            </div>
          </div>
          <div ref={ref} style={{ height: 1 }} />
        </div>
      </main>
      <FloatingButton onClick={handleOpenModal} />
      {isModalOpen && (
        <AddLPModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default LPListPage;