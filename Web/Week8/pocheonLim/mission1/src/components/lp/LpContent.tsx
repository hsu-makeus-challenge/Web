import { useRef } from 'react';
import { LpDetail } from '../../types/lp';

interface LpContentProps {
  data: LpDetail;
  isEditing: boolean;
  editContent: string;
  setEditContent: (value: string) => void;
  editThumbnail: string;
  editTagInput: string;
  setEditTagInput: (value: string) => void;
  editTags: string[];
  isUploading: boolean;
  uploadError: string | null;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleImageUploadChange: (file: File) => void;
}

export const LpContent = ({
  data,
  isEditing,
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
}: LpContentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
      </div>

      {data.audioUrl && (
        <audio src={data.audioUrl} controls autoPlay loop className="mx-auto mb-4" />
      )}

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
    </>
  );
}; 