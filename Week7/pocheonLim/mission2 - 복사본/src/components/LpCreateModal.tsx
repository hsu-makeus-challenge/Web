import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useLpCreate } from '../hooks/useLpCreate';
import { useTagManagement } from '../hooks/useTagManagement';
import { uploadImage } from '../apis/upload';

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreateModal = ({ isOpen, onClose }: LpCreateModalProps) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [name, setName] = React.useState('');
  const [content, setContent] = React.useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { tagInput, setTagInput, tags, handleAddTag, handleRemoveTag, handleTagKeyDown } = useTagManagement();
  const { mutation, handleAddLp } = useLpCreate();

  if (!isOpen) return null;

  // 모달 바깥 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // LP 이미지 클릭 시 파일 input 열기
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 이미지 변경
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setImage(imageUrl);
      } catch {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  // 모든 값이 입력되어야 Add LP 활성화
  const isAddLpEnabled = !!(image && name.trim() && content.trim() && tags.length);

  // LP 생성 요청
  const handleSubmit = () => {
    handleAddLp({
      title: name,
      content,
      thumbnail: image || '',
      tags,
      published: true,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-[#232b3b] rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        {/* X 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose />
        </button>
        {/* LP 이미지 */}
        <div className="w-40 h-40 mb-6 cursor-pointer flex items-center justify-center" onClick={handleImageClick}>
          <img
            src={image || '/images/lp.png'}
            alt="LP"
            className="w-full h-full object-contain rounded-full border-4 border-gray-700 shadow"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {/* 입력 폼 */}
        <input
          type="text"
          placeholder="LP Name"
          className="w-full mb-3 px-4 py-2 rounded bg-transparent border border-gray-500 text-white focus:outline-none"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="LP Content"
          className="w-full mb-3 px-4 py-2 rounded bg-transparent border border-gray-500 text-white focus:outline-none"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex w-full mb-2">
          <input
            type="text"
            placeholder="LP Tag"
            className="flex-1 px-4 py-2 rounded-l bg-transparent border border-gray-500 text-white focus:outline-none"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <button
            className={`px-4 py-2 rounded-r ${tagInput.trim() ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
            onClick={handleAddTag}
            disabled={!tagInput.trim()}
            type="button"
          >Add</button>
        </div>
        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-2 w-full mb-6">
          {tags.map(tag => (
            <span key={tag} className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
              {tag}
              <button
                className="ml-2 text-gray-300 hover:text-pink-400 text-base"
                onClick={() => handleRemoveTag(tag)}
                type="button"
              >
                x
              </button>
            </span>
          ))}
        </div>
        <button
          className={`w-full py-3 rounded ${isAddLpEnabled ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
          disabled={!isAddLpEnabled || mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending ? '생성 중...' : 'Add LP'}
        </button>
      </div>
    </div>
  );
};

export default LpCreateModal; 