import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLPDetail } from '../api/lp';
import { LP, Comment } from '../types/lp';
import useGetInfiniteComments from '../hooks/queries/useGetInfiniteComments';
import SkeletonCard from '../components/SkeletonCard';
import CommentSkeleton from '../components/CommentSkeleton';
import { useInView } from 'react-intersection-observer';
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaSpinner, FaMusic } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { createComment, updateComment, deleteComment } from '../api/comments'; // 댓글 API 함수

// API 응답 타입 정의
type ApiResponse<T> = {
  message: string;
  data: T;
};

interface UpdateCommentVariables {
  commentId: string;
  content: string;
}

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
  } = useGetInfiniteComments({ lpid: lpId || '', order, limit: 5 });

  // 댓글 작성
  const { mutate: createCommentMutation } = useMutation<ApiResponse<Comment>, Error, string>({
    mutationFn: (newComment: string) => createComment(Number(lpId), newComment),
    onSuccess: () => {
      setCommentContent('');
      // 댓글 작성 후 새로 고침
      window.location.reload();
    },
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  });

  // 댓글 수정
  const { mutate: updateCommentMutation } = useMutation<ApiResponse<Comment>, Error, UpdateCommentVariables>({
    mutationFn: (updatedComment) =>
      updateComment(Number(lpId), Number(updatedComment.commentId), updatedComment.content),
    onSuccess: () => {
      // 수정 후 새로 고침
      window.location.reload();
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  });

  // 댓글 삭제
  const { mutate: deleteCommentMutation } = useMutation<{ message: string }, Error, string>({
    mutationFn: (commentId: string) => deleteComment(Number(lpId), Number(commentId)),
    onSuccess: () => {
      // 삭제 후 새로 고침
      window.location.reload();
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  });

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
    if (inView && hasNextPage && !commentLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, commentLoading, isFetchingNextPage, fetchNextPage]);

  if (loading) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white">로딩 중...</div>;
  if (error) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white text-red-500">{error}</div>;
  if (!lp) return <div className="flex items-center justify-center w-full min-h-screen bg-black text-white">LP를 찾을 수 없습니다.</div>;

  const comments = commentPages?.pages.flatMap(page => page.data.data) || [];

  // 댓글 작성 함수
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      createCommentMutation(commentContent);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 수정 함수
  const handleCommentEdit = (commentId: string) => {
    const updatedContent = prompt('댓글을 수정하세요:', ''); 
    if (updatedContent) {
      updateCommentMutation({ commentId, content: updatedContent });
    }
  };

  // 댓글 삭제 함수
  const handleCommentDelete = (commentId: string) => {
    const confirmDelete = window.confirm('이 댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteCommentMutation(commentId);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-black text-white w-full pb-0">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 relative mb-0">
        {/* LP 정보 */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {lp.author?.avatar ? (
              <img src={lp.author.avatar} alt={lp.author.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-lg font-bold">
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
        <h1 className="text-2xl font-bold text-white text-center mb-2">{lp.title}</h1>
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
        <div className="text-gray-200 text-center text-base mb-4 whitespace-pre-line">{lp.content}</div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span key={tag.id} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs">#{tag.name}</span>
          ))}
        </div>
        <div className="flex justify-center items-center gap-1 mb-6">
          <FaHeart className="text-pink-400" />
          <span className="text-pink-400 font-bold text-lg">{lp.likes.length}</span>
        </div>

        {/* 댓글 영역 */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">댓글</h2>
          </div>

          {/* 댓글 입력란 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
                {localStorage.getItem('signup_nickname')?.[0] || '?'}
              </div>
              <span className="text-white font-medium">
                {localStorage.getItem('signup_nickname') || '익명'}
              </span>
            </div>
            <form onSubmit={handleCommentSubmit} className="relative">
              <input
                type="text"
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="댓글을 입력해주세요"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                disabled={!commentContent.trim()}
              >
                작성
              </button>
            </form>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
                      {comment.author?.name?.[0] || '?'}
                    </div>
                    <div>
                      <span className="font-bold text-white">{comment.author?.name}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCommentEdit(String(comment.id))}
                      className="text-gray-400 hover:text-green-400 transition"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleCommentDelete(String(comment.id))}
                      className="text-gray-400 hover:text-red-400 transition"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-200 pl-10">{comment.content}</p>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage;
