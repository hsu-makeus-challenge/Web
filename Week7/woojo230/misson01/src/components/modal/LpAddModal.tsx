import { useState, useRef } from 'react';
import usePostLpData from '../../hooks/queries/usePostLpData';
import useLpModalStore from '../../stores/LpModal';
import LoadingSpinner from '../loading';
import Error from '../error';
import instance from '../../apis/auth/axios';

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

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleThumbnailButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await instance.post('/v1/uploads', formData);
        const imageUrl = res.data.data.imageUrl;
        setThumbnailPreview(imageUrl);
        setThumbnail(imageUrl);
      } catch (err) {
        alert('이미지 업로드 실패');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !content.trim() ||
      !thumbnail.trim() ||
      tags.length === 0
    ) {
      alert('모든 항목을 입력해주세요!');
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
          <input
            type="text"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
          />
          <input
            type="text"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleThumbnailButtonClick}
              className="px-4 py-2 bg-[#44454b] text-gray-200 rounded-md hover:bg-[#5a5b60] transition-colors duration-200 text-sm font-medium cursor-pointer w-full"
            >
              썸네일 업로드
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="썸네일 미리보기"
                className="w-full h-32 object-cover rounded-md border border-[#44454b] mt-2"
              />
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className="flex-1 px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-[#44454b] text-gray-200 rounded-md hover:bg-[#5a5b60] transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              Add
            </button>
          </div>
          {/* 태그 리스트 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-lime-700 text-white px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded transition-colors duration-200"
            />
            <label
              htmlFor="published"
              className="block text-sm text-gray-300 select-none"
            >
              공개 여부
            </label>
          </div>
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
