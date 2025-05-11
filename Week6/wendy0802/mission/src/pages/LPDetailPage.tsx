import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLPDetail, createComment } from '../api/lp';
import { LP, Comment } from '../types/lp';
import useGetInfiniteComments from '../hooks/queries/useGetInfiniteComments';
import SkeletonCard from '../components/SkeletonCard';
import CommentSkeleton from '../components/CommentSkeleton';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaSpinner, FaInfoCircle, FaMusic } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LPDetailPage = (): JSX.Element => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<LP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('현재 LP ID:', lpId);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: '0px 0px 500px 0px',
  });

  const {
    data: commentPages,
    isLoading: commentLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error: commentError,
  } = useGetInfiniteComments({ lpId: lpId || '', order, limit: 5 });

  useEffect(() => {
    console.log('inView 상태:', inView);
    console.log('hasNextPage 상태:', hasNextPage);
    console.log('commentLoading 상태:', commentLoading);
    console.log('isFetchingNextPage 상태:', isFetchingNextPage);
    
    if (inView && hasNextPage && !commentLoading && !isFetchingNextPage) {
      console.log('다음 페이지 불러오기 시도');
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
        console.error('LP 상세 정보 조회 오류:', err);
        setError('LP 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchLPDetail();
  }, [lpId]);

  useEffect(() => {
    console.log('댓글 데이터:', commentPages);
    console.log('댓글 로딩 상태:', commentLoading);
    console.log('댓글 오류:', commentError);
  }, [commentPages, commentLoading, commentError]);

  if (loading) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white">로딩 중...</div>;
  if (error) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white text-red-500">{error}</div>;
  if (!lp) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white">LP를 찾을 수 없습니다.</div>;

  const comments = commentPages?.pages.flatMap(page => page.data.data) || [];
  console.log('처리된 댓글 목록:', comments);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('수동으로 더 많은 댓글 로드');
      fetchNextPage();
    }
  };

  // 댓글 작성 함수
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      return;
    }
    
    if (!accessToken) {
      alert('댓글을 작성하려면 로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createComment(lpId as string, commentContent);
      setCommentContent('');
      
      // 컴포넌트 리렌더링을 통해 댓글 목록 갱신
      // React Query의 refetch 동작을 활용합니다
      window.location.reload();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-black text-white w-full pb-0">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 relative mb-0">
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
          {/* 댓글 작성란 */}
          <div className="flex items-start gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
              {accessToken ? (localStorage.getItem('signup_nickname')?.[0] || '?') : '?'}
            </div>
            <form className="flex-1" onSubmit={handleCommentSubmit}>
              <div className="relative">
                <textarea
                  className={`w-full h-16 p-2 rounded ${
                    accessToken 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-800 text-gray-400'
                  } resize-none focus:ring-1 focus:ring-green-500 transition`}
                  placeholder={accessToken ? "댓글을 입력하세요!" : "아직 구현 x"}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  disabled={!accessToken || isSubmitting}
                />
                {!accessToken && (
                  <div className="absolute right-2 top-2">
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                    >
                      로그인
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-2">
                {!accessToken && (
                  <p className="text-xs text-gray-500">댓글을 작성하려면 로그인이 필요합니다.</p>
                )}
                <button 
                  type="submit"
                  className={`px-4 py-1 rounded font-bold ${
                    accessToken && !isSubmitting 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  } ml-auto transition`}
                  disabled={!accessToken || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <FaSpinner className="animate-spin" /> 등록 중...
                    </span>
                  ) : '등록'}
                </button>
              </div>
            </form>
          </div>
          {/* 댓글 목록 */}
          {commentLoading ? (
            <div className="flex flex-col gap-5 pb-4">
              <h3 className="text-sm text-center text-gray-400 mb-1">댓글을 불러오는 중입니다...</h3>
              {Array.from({ length: 4 }).map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </div>
          ) : commentError ? (
            <div className="text-red-400 p-6 text-center rounded bg-gray-900 flex flex-col items-center gap-2">
              <p>댓글을 불러오지 못했습니다.</p>
              <p className="text-sm text-gray-400">실제 API 서버에 연결되어 있는지 확인해주세요.</p>
              <p className="text-xs text-gray-500 mt-2">
                {commentError instanceof Error ? commentError.message : String(commentError)}
              </p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center p-6 rounded bg-gray-900 flex flex-col items-center gap-3">
              <div className="relative w-16 h-16 mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                  <FaMusic className="text-blue-400 text-xl animate-blink" />
                </div>
              </div>
              <p className="text-gray-300">아직 이 LP에 댓글이 없습니다.</p>
              
              {!accessToken ? (
                <div className="mt-2 flex flex-col items-center">
                  <p className="text-gray-400 text-sm">댓글을 작성하려면 로그인이 필요합니다.</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-3 px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition text-sm"
                  >
                    로그인하러 가기
                  </button>
                </div>
              ) : (
                <p className="text-gray-400 text-sm mt-1">첫 댓글을 작성해 보세요!</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((comment: Comment, index) => (
                <div 
                  key={comment.id} 
                  className="bg-gray-900 rounded p-4 transition-all duration-300"
                  style={{ 
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
                  }}
                >
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
              
              {/* 모든 댓글을 로드한 경우 스켈레톤 UI 표시 */}
              {!hasNextPage && comments.length > 0 && !isFetchingNextPage && (
                <>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <CommentSkeleton key={i} />
                  ))}
                  <div className="text-center my-2">
                    <p className="text-gray-400 font-bold">모든 댓글을 확인했습니다</p>
                  </div>
                </>
              )}
              
              {/* 무한스크롤 트리거 */}
              {hasNextPage && (
                <div 
                  ref={ref} 
                  className="h-32 flex items-center justify-center my-6 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={handleLoadMore}
                >
                  {isFetchingNextPage ? (
                    <div className="flex flex-col items-center gap-2">
                      <FaSpinner className="animate-spin text-2xl text-green-500" />
                      <p className="text-gray-400">댓글 불러오는 중...</p>
                    </div>
                  ) : (
                    <div className="text-gray-300 hover:text-white font-bold text-center">
                      <p className="animate-pulse">더 많은 댓글 불러오기</p>
                      <p className="text-sm text-gray-500 mt-1">클릭하거나 스크롤하세요</p>
                    </div>
                  )}
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