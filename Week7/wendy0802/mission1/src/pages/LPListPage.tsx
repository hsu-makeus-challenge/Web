import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import LPCard from '../components/LPCard';
import Navbar from '../components/Navbar';
import SkeletonCard from '../components/SkeletonCard';
import FloatingButton from '../components/FloatingButton';
import { createLP } from '../api/lp';
import AddLPModal from '../components/AddLPModal';

const LPListPage = () => {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteLpList({ order, limit: 20 });
  const { ref, inView } = useInView();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (error) return <div className="text-center text-red-500">에러 발생</div>;
  if (isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
      {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  const handleAddLP = async (formData: FormData) => {
    // FormData → JSON 변환
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tags = formData.getAll('tags').map(String);
    const published = formData.get('published') === 'true';

    let thumbnail = '';
    const file = formData.get('thumbnail');
    if (file && file instanceof File) {

      thumbnail = '';
    } else if (typeof file === 'string') {
      thumbnail = file;
    }

    await createLP({
      title,
      content,
      thumbnail,
      tags,
      published,
    });

    setIsModalOpen(false);
    
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black dark:bg-gray-900 shadow-md">
        <Navbar />
      </nav>
      <main className="pt-16">
        <div className="py-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-green-500">LP</h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setOrder('desc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'desc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder('asc')}
              className={`px-4 py-2 rounded-full font-bold shadow-md transition ${order === 'asc' ? 'bg-green-400 text-green-900' : 'bg-white text-green-500 border-2 border-green-400'}`}
            >
              최신순
            </button>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {data?.pages?.flatMap((page) =>
                page?.data?.data?.map((lp: any) => <LPCard key={lp.id} lp={lp} />) ?? []
              ) ?? []}
              {(isFetchingNextPage) && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
            <div ref={ref} style={{ height: 1 }} />
          </div>
        </div>
      </main>
      <FloatingButton onClick={handleOpenModal} />
      <AddLPModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddLP}
      />
    </>
  );
};

export default LPListPage;
