import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLPDetail } from '../api/lp';
import { LP } from '../types/lp';
import useGetInfiniteComments from '../hooks/queries/useGetInfiniteComments';
import SkeletonCard from '../components/SkeletonCard';
import { useInView } from 'react-intersection-observer';

const LPDetailPage = (): JSX.Element => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<LP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const navigate = useNavigate();

  // 댓글 무한스크롤
  const {
    data: commentPages,
    isLoading: commentLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error: commentError,
  } = useGetInfiniteComments({ lpId: lpId || '', order, limit: 5 });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !commentLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, commentLoading, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const fetchLPDetail = async () => {
      if (!lpId) return;
      try {
        setLoading(true);
        const response = await getLPDetail(lpId);
        setLp(response.data);
        setError(null);
      } catch (err) {
        setError('LP 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchLPDetail();
  }, [lpId]);

  if (loading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!lp) return <div className="text-center p-4">LP를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div
          onClick={() => navigate(`${lp.id}`)}
          className="w-full h-96 object-cover"
        >
          <img 
            src={lp.thumbnail} 
            alt={lp.title}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{lp.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{lp.content}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {lp.tags.map((tag) => (
              <span key={tag.id} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-6">
            <div className="flex items-center gap-4 mb-4">
              {lp.author?.avatar && (
                <img 
                  src={lp.author.avatar} 
                  alt={lp.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="text-white font-semibold">{lp.author?.name}</h3>
                <p className="text-gray-400 text-sm">{lp.author?.email}</p>
              </div>
            </div>
            {lp.author?.bio && (
              <p className="text-gray-300 text-sm">{lp.author.bio}</p>
            )}
          </div>
          <div className="mt-6 flex justify-between items-center text-gray-400 text-sm">
            <span>작성일: {new Date(lp.createdAt).toLocaleDateString()}</span>
            <span>좋아요: {lp.likes.length}</span>
          </div>
        </div>
      </div>
      {/* 댓글 영역 */}
      <div className="max-w-4xl mx-auto mt-10 bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">댓글</h2>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${order === 'desc' ? 'bg-green-400 text-green-900' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setOrder('desc')}
            >최신순</button>
            <button
              className={`px-3 py-1 rounded ${order === 'asc' ? 'bg-green-400 text-green-900' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setOrder('asc')}
            >오래된순</button>
          </div>
        </div>
        {/* 댓글 작성란 (디자인만) */}
        <div className="flex items-start gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-700" />
          <div className="flex-1">
            <textarea
              className="w-full h-16 p-2 rounded bg-gray-800 text-white resize-none"
              placeholder="댓글을 입력하세요 (기능 미구현)"
              disabled
            />
            <button className="mt-2 px-4 py-1 rounded bg-green-500 text-white font-bold opacity-60 cursor-not-allowed" disabled>
              등록
            </button>
          </div>
        </div>
        {/* 댓글 목록 */}
        {commentLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : commentError ? (
          <div className="text-red-400">댓글을 불러오지 못했습니다.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {commentPages?.pages?.flatMap((page) => page?.data?.data || []).map((comment: any) => (
              <div key={comment.id} className="bg-gray-800 rounded p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    {comment.author?.name?.[0] || '?'}
                  </div>
                  <div>
                    <span className="font-bold text-white mr-2">{comment.author?.name}</span>
                    <span className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-gray-200 text-base">{comment.content}</div>
              </div>
            ))}
            {/* 무한스크롤 트리거 */}
            {hasNextPage && (
              <div ref={ref} className="h-10 flex items-center justify-center">
                {isFetchingNextPage ? <SkeletonCard /> : <span className="text-gray-400">더 불러오는 중...</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LPDetailPage; 