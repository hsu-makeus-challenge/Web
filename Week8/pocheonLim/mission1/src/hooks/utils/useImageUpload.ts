import { useState } from 'react';
import { uploadImage } from '../../apis/upload';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (err) {
      setError('이미지 업로드에 실패했습니다.');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleImageUpload,
    isUploading,
    error
  };
}; 