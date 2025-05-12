import { useRef } from 'react';
import { SaveIcon, CancelIcon, UploadIcon } from './icons';
import { handleThumbnailChange } from '../../utils/lpModal/lpModalUtils';
import { LpRecord } from './LpComponents';

interface LpEditFormProps {
  title: string;
  content: string;
  thumbnailPreview: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onUpload: () => void;
}

const LpEditForm = ({
  title,
  content,
  thumbnailPreview,
  onTitleChange,
  onContentChange,
  onThumbnailChange,
  onSubmit,
  onCancel,
}: LpEditFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onThumbnailChange}
        accept="image/*"
        className="hidden"
      />
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg w-full mr-2"
          placeholder="제목을 입력하세요"
        />
        <div className="flex gap-2">
          <button
            className="text-lime-500 hover:text-lime-300 cursor-pointer"
            onClick={onSubmit}
          >
            <SaveIcon />
          </button>
          <button
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onCancel}
          >
            <CancelIcon />
          </button>
          <button
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={handleUpload}
          >
            <UploadIcon />
          </button>
        </div>
      </div>

      <LpRecord thumbnail={thumbnailPreview} title={title} />

      <div className="text-white text-sm mb-4">
        <input
          type="text"
          value={content}
          onChange={onContentChange}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg w-full mr-2"
        />
      </div>
    </>
  );
};

export default LpEditForm;
