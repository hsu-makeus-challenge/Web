import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import { LpHeader } from '../components/lpDetail/LpComponents';
import LpCommentsList from '../components/lpComment/LpCommentsList';
import useLpEditStore from '../stores/lpEdit';
import { useLpDetail } from '../hooks/useLpDetail';
import LpEditForm from '../components/lpDetail/LpEditForm';
import LpDisplay from '../components/lpDetail/LpDisplay';

const LpDetailPage = () => {
  const { Lpid } = useParams<{ Lpid: string }>();
  const lpId: number = Number(Lpid);
  const navigate = useNavigate();
  const { isLpEditOpen, toggleLpEdit } = useLpEditStore();
  const observerRef = useRef(null);

  const {
    lpDetailData,
    isLoading,
    isFetching,
    isUpdating,
    isDeleting,
    error,
    content,
    title,
    thumbnailPreview,
    handleContentChange,
    handleTitleChange,
    handleThumbnailChange,
    handleSubmit,
    deleteLpDetailData,
  } = useLpDetail(lpId);

  const handleDelete = () => {
    deleteLpDetailData(lpId);
    navigate('/home');
  };

  if (isLoading || isFetching || isUpdating || isDeleting)
    return <LoadingSpinner />;
  if (error) return <Error />;
  if (!lpDetailData) return null;

  return (
    <div className="flex justify-center items-center bg-lime-700 p-6 rounded-2xl max-w-2xl mx-auto my-8">
      <div className="max-w-xl w-full">
        <LpHeader
          avatar={lpDetailData.author.avatar}
          name={lpDetailData.author.name}
          createdAt={lpDetailData.createdAt}
        />

        {isLpEditOpen ? (
          <LpEditForm
            title={title}
            content={content}
            thumbnailPreview={thumbnailPreview}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onThumbnailChange={handleThumbnailChange}
            onSubmit={() => handleSubmit(toggleLpEdit)}
            onCancel={toggleLpEdit}
            onUpload={() => {}}
          />
        ) : (
          <LpDisplay lpDetailData={lpDetailData} onDelete={handleDelete} />
        )}

        <LpCommentsList observerRef={observerRef} />
        <div ref={observerRef} className="h-20" />
      </div>
    </div>
  );
};

export default LpDetailPage;
