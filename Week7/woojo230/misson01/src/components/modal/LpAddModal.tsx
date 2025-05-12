import { useState, useRef } from 'react';
import usePostLpData from '../../hooks/queries/usePostLpData';
import useLpModalStore from '../../stores/LpModal';
import LoadingSpinner from '../loading';
import Error from '../error';
import {
  handleAddTag,
  handleThumbnailChange,
  validateForm,
} from '../../utils/lpModal/lpModalUtils';
import LpFormInputs from './LpFormInputs';
import LpThumbnailUpload from './LpThumbnailUpload';
import LpTagInput from './LpTagInput';
import LpPublishCheckbox from './LpPublishCheckbox';

const LpAddModal = () => {
  const { toggleLpModal } = useLpModalStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, error } = usePostLpData();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleLpModal();
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(tagInput, tags, setTags, setTagInput);
    }
  };

  const handleThumbnailButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleThumbnailChange(file, setThumbnailPreview, setThumbnail);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(title, content, thumbnail, tags)) {
      return;
    }
    mutate(
      {
        title,
        content,
        thumbnail,
        tags,
        published,
      },
      {
        onSuccess: () => {
          alert('LP가 성공적으로 생성되었습니다!');
          toggleLpModal();
        },
      }
    );
  };

  if (isPending) return <LoadingSpinner />;
  if (error) return <Error />;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#32343a] p-8 rounded-2xl shadow-2xl w-[350px] sm:w-[400px] flex flex-col items-center relative">
        <button
          onClick={toggleLpModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          ✕
        </button>
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/20/37/record-1294479_1280.png"
          alt="LP"
          className="w-40 h-40 object-contain mb-6 mt-2 select-none pointer-events-none"
        />
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <LpFormInputs
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
          />

          <LpThumbnailUpload
            thumbnailPreview={thumbnailPreview}
            onThumbnailButtonClick={handleThumbnailButtonClick}
            onThumbnailChange={onThumbnailChange}
            fileInputRef={fileInputRef}
          />

          <LpTagInput
            tagInput={tagInput}
            tags={tags}
            onTagInputChange={(e) => setTagInput(e.target.value)}
            onTagInputKeyDown={handleTagInputKeyDown}
            onAddTag={() => handleAddTag(tagInput, tags, setTags, setTagInput)}
          />

          <LpPublishCheckbox
            published={published}
            onPublishedChange={(e) => setPublished(e.target.checked)}
          />

          <button
            type="submit"
            className="w-full mt-2 px-4 py-3 bg-[#5a5b60] text-gray-200 rounded-md hover:bg-lime-600 hover:text-white transition-colors duration-200 text-base font-semibold cursor-pointer"
          >
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
};

export default LpAddModal;
