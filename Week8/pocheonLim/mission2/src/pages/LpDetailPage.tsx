import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useLpDetail } from '../hooks/lp/queries/useLpDetail';
import { useUpdateLp } from '../hooks/lp/mutations/useUpdateLp';
import { useDeleteLp } from '../hooks/lp/mutations/useDeleteLp';
import { useAuth } from '../contexts/AuthContext';
import { useLpEdit } from '../hooks/lp/mutations/useLpEdit';
import { useCommentManagement } from '../hooks/comment/useCommentManagement';
import { useLikeManagement } from '../hooks/like/useLikeManagement';
import { useInfiniteScroll } from '../hooks/utils/useInfiniteScroll';
import { useCommentSort } from '../hooks/comment/useCommentSort';
import { LpHeader } from '../components/lp/LpHeader';
import { LpContent } from '../components/lp/LpContent';
import { CommentSection } from '../components/comment/CommentSection';

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const COMMENT_LIMIT = 5;

  const { data, isLoading, isError } = useLpDetail(lpId);
  const { user } = useAuth();

  const { commentOrder, handleSortChange } = useCommentSort();

  const updateLpMutation = useUpdateLp(lpId!);
  const deleteLpMutation = useDeleteLp(lpId!, navigate);

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
  } = useCommentManagement(lpId!, commentOrder);

  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  });

  const {
    isLiked,
    handleLikeClick,
    addLikeMutation,
    removeLikeMutation,
  } = useLikeManagement(lpId!, commentOrder, data?.likes);

  if (isLoading) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">로딩 중...</div>;
  if (isError) {
    console.error('에러 상세:', isError);
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-red-500">LP 정보를 불러올 수 없습니다.</div>;
  }
  if (!data) return <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">데이터가 없습니다.</div>;

  // 댓글 합치기
  const comments = commentData?.pages.flatMap(page => page.data) ?? [];
  
  // 본인이 작성한 LP인지 확인
  const isMyLp = user?.id === data.authorId;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <div className="bg-[#232b3b] rounded-xl p-8 w-full max-w-2xl shadow-lg relative">
        <LpHeader
          data={data}
          isMyLp={isMyLp}
          isEditing={isEditing}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          setIsEditing={setIsEditing}
          onDelete={() => {
            if (window.confirm('정말로 이 LP를 삭제하시겠습니까?')) {
              deleteLpMutation.mutate();
            }
          }}
        />
        
        <LpContent
          data={data}
          isEditing={isEditing}
          editContent={editContent}
          setEditContent={setEditContent}
          editThumbnail={editThumbnail}
          editTagInput={editTagInput}
          setEditTagInput={setEditTagInput}
          editTags={editTags}
          isUploading={isUploading}
          uploadError={uploadError}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          handleTagKeyDown={handleTagKeyDown}
          handleImageUploadChange={handleImageUploadChange}
        />

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

      <CommentSection
        commentOrder={commentOrder}
        handleSortChange={handleSortChange}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        commentError={commentError}
        isCommentLoading={isCommentLoading}
        isFetchingNextPage={isFetchingNextPage}
        comments={comments}
        user={user}
        showMenuId={showMenuId}
        setShowMenuId={setShowMenuId}
        editingCommentId={editingCommentId}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        handleCommentSubmit={handleCommentSubmit}
        handleCommentEdit={handleCommentEdit}
        handleCommentDelete={handleCommentDelete}
        handleCommentUpdate={handleCommentUpdate}
        handleCommentEditCancel={handleCommentEditCancel}
        createCommentMutation={createCommentMutation}
        updateCommentMutation={updateCommentMutation}
        COMMENT_LIMIT={COMMENT_LIMIT}
        scrollRef={scrollRef}
      />
    </div>
  );
};

export default LpDetailPage; 