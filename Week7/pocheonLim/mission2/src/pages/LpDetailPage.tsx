import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Comment } from '../types/comment';
import SkeletonComment from '../components/skeleton/SkeletonComment';
import { useLpDetail } from '../hooks/lp/useLpDetail';
import { useLpMutations } from '../hooks/lp/useLpMutations';
import { useAuth } from '../contexts/AuthContext';
import { MdMoreVert, MdEdit, MdDelete } from 'react-icons/md';
import { useLpEdit } from '../hooks/lp/useLpEdit';
import { useCommentManagement } from '../hooks/comment/useCommentManagement';
import { useLikeManagement } from '../hooks/like/useLikeManagement';
import { useInfiniteScroll } from '../hooks/utils/useInfiniteScroll';
import { useCommentSort } from '../hooks/comment/useCommentSort';

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useLpDetail(lpId);
  const { user } = useAuth();

  const { commentOrder, handleSortChange } = useCommentSort();

  const {
    updateLpMutation,
    deleteLpMutation
  } = useLpMutations(
    lpId!,
    commentOrder,
    () => {},
    () => {},
    () => {},
    () => {},
    navigate
  );

  const {
    isEditing,
    setIsEditing,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    editThumbnail,
    editTagInput,
    setEditTagInput,
    editTags,
    isUploading,
    uploadError,
    handleAddTag,
    handleRemoveTag,
    handleTagKeyDown,
    handleImageUploadChange,
    resetEditForm
  } = useLpEdit(data);

  const {
    commentInput,
    setCommentInput,
    commentError,
    editingCommentId,
    editedContent,
    setEditedContent,
    showMenuId,
    setShowMenuId,
    commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isCommentLoading,
    createCommentMutation,
    updateCommentMutation,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
    handleCommentUpdate,
    handleCommentEditCancel,
    COMMENT_LIMIT
  } = useCommentManagement(lpId!, commentOrder);

  const { scrollRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  });

  const {
    isLiked,
    handleLikeClick,
    addLikeMutation,
    removeLikeMutation
  } = useLikeManagement(lpId!, commentOrder, data?.likes);

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
                <span className="text-white">{isUploading ? '업로드 중...' : '이미지 변경'}</span>
              </div>
              {uploadError && <div className="text-red-500 text-sm mt-1">{uploadError}</div>}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={e => e.target.files?.[0] && handleImageUploadChange(e.target.files[0])}
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
              onClick={resetEditForm}
              className="py-2 px-4 bg-gray-500 text-white rounded font-bold hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        )}
        {/* 좋아요 버튼 */}
        <div className="flex justify-center items-center gap-1 text-pink-400 text-xl mt-2">
          <button
            onClick={handleLikeClick}
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
              onClick={() => handleSortChange('asc')}
            >
              오래된순
            </button>
            <button
              className={`px-3 py-1 rounded ${commentOrder === 'desc' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleSortChange('desc')}
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
              disabled={createCommentMutation.isPending}
            />
          </div>
          <button
            className={`bg-pink-500 text-white px-4 py-2 rounded font-bold ${commentInput.trim() && !createCommentMutation.isPending ? '' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!commentInput.trim() || createCommentMutation.isPending}
            onClick={handleCommentSubmit}
          >
            {createCommentMutation.isPending ? '등록 중...' : '등록'}
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
                              onClick={() => handleCommentEdit(comment.id, comment.content)}
                            >
                              <MdEdit /> 
                            </button>
                            <button
                              className="flex items-center gap-1 px-3 py-2 hover:bg-gray-700 w-full text-red-400"
                              onClick={() => handleCommentDelete(comment.id)}
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
                          onClick={handleCommentEditCancel}
                        >
                          취소
                        </button>
                        <button
                          className="px-2 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                          disabled={!editedContent.trim() || updateCommentMutation.isPending}
                          onClick={() => handleCommentUpdate(comment.id, editedContent)}
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