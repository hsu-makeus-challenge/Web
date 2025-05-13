import React, { useState, useRef } from 'react';
import axios from 'axios';

interface Tag {
  id: number;
  name: string;
}

interface AddLPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const AddLPModal: React.FC<AddLPModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextTagId = useRef(1);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log("선택된 파일:", selectedFile.name, selectedFile.type, selectedFile.size);
      
      if (!selectedFile.type.startsWith('image/')) {
        alert('이미지 파일만 선택할 수 있습니다.');
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해주세요.');
        return;
      }
      
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, { id: nextTagId.current, name: tagInput.trim() }]);
      nextTagId.current += 1;
      setTagInput('');
    }
  };

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !content.trim() || !image) {
      alert('LP 이름, 설명, 이미지는 필수입니다.');
      return;
    }

    if (tags.length === 0) {
      alert('최소 한 개 이상의 태그를 등록해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', name);
      formData.append('content', content);

      if (image) {
        formData.append('thumbnail', image);
      }
 
      tags.forEach(tag => {
        formData.append('tags', tag.name);
      });
      
      formData.append('published', 'true');
      
      await onSubmit(formData);
      
      // Reset form
      setName('');
      setContent('');
      setTagInput('');
      setTags([]);
      setImage(null);
      setPreviewUrl(null);
    } catch (error: any) {
      console.error('LP 생성 실패:', error);
      alert('LP 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[2000]"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl text-white font-bold mb-4 text-center">새로운 LP 추가</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div 
              onClick={handleImageClick}
              className="cursor-pointer w-32 h-32 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center overflow-hidden text-gray-400 text-sm text-center leading-tight"
            >
              <img
                src={previewUrl || '/lp-default.png'}
                alt="LP Preview"
                className="w-full h-full object-cover"
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="lpName" className="block text-sm font-medium text-gray-300 mb-1">LP 이름</label>
            <input
              id="lpName"
              type="text"
              placeholder="LP 이름을 입력하세요!"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lpContent" className="block text-sm font-medium text-gray-300 mb-1">설명</label>
            <textarea
              id="lpContent"
              placeholder="설명을 입력하세요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
              required
            />
          </div>

          <div>
            <label htmlFor="lpTag" className="block text-sm font-medium text-gray-300 mb-1">태그</label>
            <div className="flex">
              <input
                id="lpTag"
                type="text"
                placeholder="태그를 입력하세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 transition-colors"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <div 
                  key={tag.id} 
                  className="bg-gray-600 text-white px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => removeTag(tag.id)}
                    className="ml-1.5 text-gray-300 hover:text-white text-xs"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded hover:bg-green-700 transition-colors font-semibold"
          >
            LP 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLPModal;
