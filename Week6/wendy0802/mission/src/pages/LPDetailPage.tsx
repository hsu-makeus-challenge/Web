import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLPDetail } from '../api/lp';
import { LP } from '../types/lp';
import useGetInfiniteComments from '../hooks/queries/useGetInfiniteComments';
import SkeletonCard from '../components/SkeletonCard';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';

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
    <div className="flex justify-center items-start min-h-screen bg-black pt-16 pb-24">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 relative">
        {/* 상단: 작성자, 작성일, 수정/삭제 */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {lp.author?.avatar ? (
              <img src={lp.author.avatar} alt={lp.author.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-lg font-bold">
                {lp.author?.name?.[0] || '?'}
              </div>
            )}
            <span className="font-semibold text-white text-base">{lp.author?.name}</span>
            <span className="text-gray-400 text-xs ml-2">{new Date(lp.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-green-400"><FaEdit size={16} /></button>
            <button className="hover:text-red-400"><FaTrash size={16} /></button>
          </div>
        </div>
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">{lp.title}</h1>
        {/* LP 썸네일 (LP판 스타일) */}
        <div className="flex justify-center my-6">
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-lg border-8 border-gray-800 bg-black flex items-center justify-center">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover rounded-full select-none animate-spin"
              draggable={false}
            />
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-gray-300 z-10" />
          </div>
        </div>
        {/* 설명 */}
        <div className="text-gray-200 text-center text-base mb-4 whitespace-pre-line">{lp.content}</div>
        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span key={tag.id} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs">#{tag.name}</span>
          ))}
        </div>
        {/* 좋아요 */}
        <div className="flex justify-center items-center gap-1 mb-6">
          <FaHeart className="text-pink-400" />
          <span className="text-pink-400 font-bold text-lg">{lp.likes.length}</span>
        </div>
        {/* 댓글 영역 */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">댓글</h2>
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
                className="w-full h-16 p-2 rounded bg-gray-900 text-white resize-none"
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
                <div key={comment.id} className="bg-gray-900 rounded p-4">
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
    </div>
  );
};

export default LPDetailPage; 