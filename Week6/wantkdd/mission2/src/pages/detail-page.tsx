import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useGetLpDetail } from '../hooks/queries/useGetLpDetail';
import { useGetInfiniteComments } from '../hooks/queries/useGetInfiniteLpDetail';
import Comment from '../components/comment';
import CommentSkeleton from '../components/comment-skeleton';

const LpDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [commentOrder, setCommentOrder] = useState<'desc' | 'asc'>('desc');
  const COMMENTS_PER_PAGE = 5;

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const {
    data: lpData,
    isLoading: isLpLoading,
    error: lpError,
  } = useGetLpDetail(id as string);

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetInfiniteComments(id as string, COMMENTS_PER_PAGE, commentOrder);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = commentsData?.pages.flatMap((page) => page.data.data) || [];

  if (isLpLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-xl text-white mb-4">로딩 중...</h2>
      </div>
    );
  }

  if (lpError || !lpData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-red-500 mb-4">LP를 불러오지 못했습니다.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                {lpData.author?.nickname?.charAt(0) || '?'}
              </div>
              <span className="ml-3 text-sm text-gray-300">
                {lpData.author?.nickname || '익명'}
              </span>
            </div>

            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-white">
                수정
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                삭제
              </button>
            </div>
          </div>

          <div className="text-center my-4">
            <h1 className="text-xl font-bold">{lpData.title}</h1>
            <p className="text-sm text-gray-400">
              {new Date(lpData.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-center py-8 relative">
            <div
              className={`w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg cursor-pointer ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <img
                src={lpData.thumbnail}
                alt={lpData.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-700"></div>
              </div>
            </div>
          </div>

          <div className="p-6 text-center">
            <p className="text-sm text-gray-400 mb-4">{lpData.content}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {lpData.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center text-pink-500 hover:text-pink-400">
                <span>♥</span>
                <span className="ml-2">{lpData.likes.length}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">댓글</h2>
              <div className="flex space-x-2">
                <button
                  className={`text-sm px-3 py-1 rounded ${
                    commentOrder === 'desc'
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setCommentOrder('desc')}
                >
                  최신순
                </button>
                <button
                  className={`text-sm px-3 py-1 rounded ${
                    commentOrder === 'asc'
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setCommentOrder('asc')}
                >
                  오래된순
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-800">
            <form className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div className="flex-1">
                <textarea
                  placeholder="댓글을 작성하세요"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-pink-500 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded text-sm"
                  >
                    등록
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="p-4">
            {isCommentsLoading && (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            )}

            {!isCommentsLoading && !commentsError && (
              <>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
                {isFetchingNextPage && (
                  <>
                    <CommentSkeleton />
                    <CommentSkeleton />
                  </>
                )}

                {hasNextPage && <div ref={ref} className="h-4" />}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LpDetailPage;
