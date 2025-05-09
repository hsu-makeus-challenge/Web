import { useState, useEffect } from 'react';
import { getLPList } from '../api/lp';
import LPCard from '../components/LPCard';

const LPListPage = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getLPList({ order, limit: 20, cursor: (page - 1) * 20 })
      .then((res) => setData(res))
      .catch((err) => setError('LP 목록 조회 실패'))
      .finally(() => setIsLoading(false));
  }, [order, page]);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        🎵 LP 목록 🎵
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setOrder('asc')}
          className={`px-4 py-2 rounded ${order === 'asc' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder('desc')}
          className={`px-4 py-2 rounded ${order === 'desc' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}
        >
          최신순
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-2 py-1 rounded bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-300"
        >
          {"<"}
        </button>
        <span className="text-lg font-bold text-white">{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data?.data?.nextCursor}
          className="px-2 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 disabled:bg-gray-300"
        >
          {">"}
        </button>
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">로딩 중...</div>
        </div>
      )}

      <div>
        {data?.data?.data && data.data.data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
            {data.data.data.map((lp: any) => (
              <LPCard key={lp.id} lp={lp} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-white">LP 목록이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default LPListPage;