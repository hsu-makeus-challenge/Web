import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Comment } from '../types/comment';
import SkeletonComment from '../components/skeleton/SkeletonComment';
import { useLpDetail } from '../hooks/useLpDetail';
import { useComments, COMMENT_LIMIT } from '../hooks/useComments';
import { updateComment, deleteComment, updateLp, deleteLp, addLike, removeLike } from '../apis/lp';
import { axiosInstance } from '../apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { uploadImage } from '../apis/upload';

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('asc');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [commentInput, setCommentInput] = useState('');
  const [commentError, setCommentError] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [showMenuId, setShowMenuId] = useState<number | null>(null);

  // LP 수정 관련 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editTagInput, setEditTagInput] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useLpDetail(lpId);
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
  } = useComments(lpId, commentOrder);

  // LP 데이터가 로드되면 수정 폼 초기화
  useEffect(() => {
    if (data) {
      setEditTitle(data.title);
      setEditContent(data.content);
      setEditThumbnail(data.thumbnail);
      // 태그 배열 초기화
      setEditTags(data.tags ? data.tags.map((tag: { name: string }) => tag.name) : []);
    }
  }, [data]);

  // LP 수정 mutation
  const updateLpMutation = useMutation({
    mutationFn: (updateData: {
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
      published: boolean;
    }) => updateLp(Number(lpId), updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] }); // LP 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['myLps'] }); // 내 LP 목록 쿼리 무효화
      setIsEditing(false);
    },
    onError: () => {
      alert('LP 수정에 실패했습니다.');
    }
  });

  // LP 삭제 mutation
  const deleteLpMutation = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      queryClient.invalidateQueries({ queryKey: ['myLps'] });
      navigate('/mypage'); 
    },
    onError: () => {
      alert('LP 삭제에 실패했습니다.');
    }
  });

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setEditThumbnail(imageUrl);
      } catch {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  // 태그 추가 핸들러
  const handleAddTag = () => {
    const tag = editTagInput.trim();
    if (tag && !editTags.includes(tag)) {
      setEditTags([...editTags, tag]);
      setEditTagInput('');
    }
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tag: string) => {
    setEditTags(editTags.filter(t => t !== tag));
  };

  // 태그 입력 키 이벤트 핸들러
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editTagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const mutation = useMutation({
    mutationFn: ({ lpId, content }: { lpId: number; content: string }) =>
      axiosInstance.post(`/v1/lps/${lpId}/comments`, { content }),
    onSuccess: () => {
      setCommentInput('');
      setCommentError('');
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
    onError: (err: unknown) => {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
      ) {
        setCommentError((err as { response: { data: { message: string } } }).response.data.message);
      } else {
        setCommentError('댓글 등록 중 오류가 발생했습니다.');
      }
    },
  });

  // 댓글 수정
  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(Number(lpId), commentId, content),
    onSuccess: () => {
      setEditingCommentId(null);
      setEditedContent('');
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
  });

  // 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(Number(lpId), commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpId, commentOrder] });
    },
  });

  // 좋아요 추가 mutation
  const addLikeMutation = useMutation({
    mutationFn: () => addLike(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
    },
    onError: () => {
      alert('좋아요 추가에 실패했습니다.');
    }
  });

  // 좋아요 취소 mutation
  const removeLikeMutation = useMutation({
    mutationFn: () => removeLike(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpDetail', lpId] });
    },
    onError: () => {
      alert('좋아요 취소에 실패했습니다.');
    }
  });

  // 현재 사용자가 좋아요를 눌렀는지 확인
  const isLiked = data?.likes?.some(like => like.userId === user?.id);

  // 무한 스크롤 (댓글 영역)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
    const ref = scrollRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => { if (ref) ref.removeEventListener('scroll', handleScroll); };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">로딩 중...</div>;
  if (isError) {
    console.error('에러 상세:', isError);
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-red-500">LP 정보를 불러올 수 없습니다.</div>;
  }
  if (!data) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">데이터가 없습니다.</div>;

  // 댓글 합치기
  const comments: Comment[] = commentData?.pages.flatMap(page => page.data) ?? [];
  
  // 본인이 작성한 LP인지 확인
  const isMyLp = user?.id === data.authorId;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="bg-[#232b3b] rounded-xl p-8 w-full max-w-2xl shadow-lg relative">
        {/* 작성자, 제목, 날짜 */}
        <div className="flex items-center gap-3 mb-2">
          <img src={data.author?.avatar || '/images/user.png'} alt="작성자" className="w-10 h-10 rounded-full" />
          <span className="text-base font-semibold">{data.author?.name}</span>
          <span className="ml-auto text-xs text-gray-400">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        {/* 제목 인라인 편집 */}
        <div className="text-2xl font-bold mb-4 flex items-center gap-2">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white w-full"
              autoFocus
            />
          ) : (
            <span>{data.title}</span>
          )}
        </div>
        {/* 이미지 인라인 편집 */}
        <div className="relative flex justify-center mb-6">
          {isEditing ? (
            <div className="relative" onClick={() => fileInputRef.current?.click()}>
              <img 
                src={editThumbnail || '/images/lp.png'} 
                alt="LP Cover" 
                className="w-80 h-80 object-cover rounded-lg shadow spin-slow cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                <span className="text-white">이미지 변경</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <img src={data.thumbnail} alt={data.title} className="w-80 h-80 object-cover rounded-lg shadow spin-slow" />
          )}
          {/* 수정/삭제 버튼을 앨범 이미지 우상단에 배치 (본인 LP만) */}
          {isMyLp && !isEditing && (
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button 
                className="text-gray-400 hover:text-white bg-[#232b3b] rounded-full p-1"
                onClick={() => setIsEditing(true)}
              >
                <MdEdit size={20} />
              </button>
              <button 
                className="text-gray-400 hover:text-red-500 bg-[#232b3b] rounded-full p-1"
                onClick={() => {
                  if (window.confirm('정말로 이 LP를 삭제하시겠습니까?')) {
                    deleteLpMutation.mutate();
                  }
                }}
              >
                <MdDelete size={20} />
              </button>
            </div>
          )}
        </div>
        {/* 오디오 플레이어 (audioUrl이 있다고 가정) */}
        {data.audioUrl && (
          <audio src={data.audioUrl} controls autoPlay loop className="mx-auto mb-4" />
        )}
        {/* 설명 인라인 편집 */}
        <div className="text-gray-200 text-center mb-4 flex items-center gap-2">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white"
              rows={3}
            />
          ) : (
            <span>{data.content}</span>
          )}
        </div>
        {/* 태그 인라인 편집 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4 items-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTagInput}
                onChange={e => setEditTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="태그 입력 후 Enter"
              />
              <button onClick={handleAddTag} disabled={!editTagInput.trim()} className="px-2 py-1 bg-pink-500 text-white rounded disabled:opacity-50">추가</button>
              {editTags.map((tag, idx) => (
                <span key={idx} className="bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-200 flex items-center">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-gray-400 hover:text-white">×</button>
                </span>
              ))}
            </>
          ) : (
            <>
              {data.tags?.map((tag: { id: number; name: string }) => (
                <span key={tag.id} className="bg-gray-700 text-xs px-3 py-1 rounded-full text-gray-200">#{tag.name}</span>
              ))}
            </>
          )}
        </div>
        {/* 저장/취소 버튼 */}
        {isMyLp && isEditing && (
          <div className="flex gap-2 mb-4 justify-center">
            <button
              onClick={() => {
                if (!editTitle.trim() || !editContent.trim() || !editThumbnail) {
                  alert('제목, 내용, 이미지는 필수입니다.');
                  return;
                }
                updateLpMutation.mutate({
                  title: editTitle,
                  content: editContent,
                  thumbnail: editThumbnail,
                  tags: editTags,
                  published: true
                });
                setIsEditing(false);
              }}
              disabled={updateLpMutation.isPending}
              className="py-2 px-4 bg-pink-500 text-white rounded font-bold hover:bg-pink-600 disabled:opacity-50"
            >
              {updateLpMutation.isPending ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 bg-gray-500 text-white rounded font-bold hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        )}
        {/* 좋아요 버튼 */}
        <div className="flex justify-center items-center gap-1 text-pink-400 text-xl mt-2">
          <button
            onClick={() => {
              if (!user) {
                alert('로그인이 필요합니다.');
                return;
              }
              if (isLiked) {
                removeLikeMutation.mutate();
              } else {
                addLikeMutation.mutate();
              }
            }}
            className={`flex items-center gap-1 hover:scale-110 transition-transform ${
              isLiked ? 'text-pink-500' : 'text-gray-400'
            }`}
            disabled={addLikeMutation.isPending || removeLikeMutation.isPending}
          >
            <span className="material-icons">favorite</span>
            <span>{data.likes?.length ?? 0}</span>
          </button>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="w-full max-w-2xl mt-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-bold text-white">댓글</div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${commentOrder === 'asc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => setCommentOrder('asc')}
            >
              오래된순
            </button>
            <button
              className={`px-3 py-1 rounded ${commentOrder === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => setCommentOrder('desc')}
            >
              최신순
            </button>
          </div>
        </div>
       
        <div className="flex items-start gap-2 mb-4">
          <div className="flex-1">
            <textarea
              className="w-full rounded bg-gray-800 text-white p-2 resize-none min-h-[48px]"
              placeholder="댓글을 입력하세요"
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              disabled={mutation.isPending}
            />
          </div>
          <button
            className={`bg-pink-500 text-white px-4 py-2 rounded font-bold ${commentInput.trim() && !mutation.isPending ? '' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!commentInput.trim() || mutation.isPending}
            onClick={() => {
              if (!lpId) return;
              mutation.mutate({ lpId: Number(lpId), content: commentInput });
            }}
          >
            {mutation.isPending ? '등록 중...' : '등록'}
          </button>
        </div>
        {commentError && <div className="text-red-400 mb-2 text-sm w-full text-center">{commentError}</div>}
        {/* 댓글 리스트 (무한스크롤) */}
        <div ref={scrollRef} className="bg-[#232b3b] rounded-lg max-h-80 overflow-y-auto p-4 space-y-4">
          {(isCommentLoading || isFetchingNextPage) &&
            Array.from({ length: COMMENT_LIMIT }).map((_, idx) => (
              <SkeletonComment key={`skeleton-comment-${idx}`} />
            ))}
          {!isCommentLoading && !isFetchingNextPage && comments.length === 0 && <div className="text-center text-gray-400">아직 댓글이 없습니다.</div>}
          {!isCommentLoading && !isFetchingNextPage && comments.map((comment) => {
            const isMine = user?.id === comment.authorId;
            return (
              <div key={comment.id} className="flex items-start gap-3 relative group">
                <img src={comment.author.avatar || '/images/user.png'} alt="작성자" className="w-8 h-8 rounded-full" />
                <div className="flex-1 bg-gray-800 rounded px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-white font-semibold">{comment.author.name}</div>
                    {isMine && (
                      <div className="relative">
                        <button
                          className="p-1 hover:bg-gray-700 rounded"
                          onClick={() => setShowMenuId(showMenuId === comment.id ? null : comment.id)}
                        >
                          <MdMoreVert size={20} />
                        </button>
                        {showMenuId === comment.id && (
                          <div className="absolute right-0 mt-1 bg-gray-900 text-white rounded shadow-lg z-10">
                            <button
                              className="flex items-center gap-1 px-3 py-2 hover:bg-gray-700 w-full"
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditedContent(comment.content);
                                setShowMenuId(null);
                              }}
                            >
                              <MdEdit /> 
                            </button>
                            <button
                              className="flex items-center gap-1 px-3 py-2 hover:bg-gray-700 w-full text-red-400"
                              onClick={() => {
                                setShowMenuId(null);
                                deleteMutation.mutate(comment.id);
                              }}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {editingCommentId === comment.id ? (
                    <div className="mt-1">
                      <textarea
                        className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
                        value={editedContent}
                        onChange={e => setEditedContent(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2 mt-1 justify-end">
                        <button
                          className="px-2 py-1 rounded bg-gray-700 text-white"
                          onClick={() => setEditingCommentId(null)}
                        >
                          취소
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                          disabled={!editedContent.trim() || updateMutation.isPending}
                          onClick={() => updateMutation.mutate({ commentId: comment.id, content: editedContent })}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-200 text-sm mb-1 whitespace-pre-line">{comment.content}</div>
                  )}
                  <div className="text-xs text-gray-400 text-right">{new Date(comment.createdAt).toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage; 