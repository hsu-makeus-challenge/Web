import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useInfiniteComments, Comment } from '../../hooks/useinfinitecomments';

type Props = {
  lpid: number;
};

const CommentsSection: React.FC<Props> = ({ lpid }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const queryClient = useQueryClient();

  const {
    data: pagesData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteComments(lpid, order);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const changeOrder = (newOrder: 'asc' | 'desc') => {
    if (newOrder === order) return;
    setOrder(newOrder);
    queryClient.removeQueries({ queryKey: ['lpComments', lpid, newOrder] });
  };

  const comments: Comment[] = pagesData?.pages.flatMap(page => page.data) || [];

  return (
    <div className="mt-8">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="flex-1 bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none"
        />
        <button className="bg-gray-700 text-white px-4 py-2 rounded-r-md">
          작성
        </button>
      </div>

      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={() => changeOrder('asc')}
          className={`px-3 py-1 rounded ${order === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
        >
          오래된순
        </button>
        <button
          onClick={() => changeOrder('desc')}
          className={`px-3 py-1 rounded ${order === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}
        >
          최신순
        </button>
      </div>

      {(!showContent || isLoading) && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-full h-3 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-5/6 h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showContent && !isLoading && comments.map(comment => (
        <div key={comment.id} className="bg-gray-800 p-3 rounded mb-2 text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
            ) : (
              comment.author.name.charAt(0)
            )}
          </div>
          <div>
            <p className="font-semibold">{comment.author.name}</p>
            <p>{comment.content}</p>
          </div>
        </div>
      ))}

      {isFetchingNextPage && <p>불러오는 중...</p>}
      <div ref={observerRef} />
    </div>
  );
};

export default CommentsSection;
