import { useState, useEffect } from 'react';
import { useImageUpload } from '../utils/useImageUpload';
import { LpDetail } from '../../types/lp';

export const useLpEdit = (initialData: LpDetail | undefined) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editTagInput, setEditTagInput] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const { handleImageUpload, isUploading, error: uploadError } = useImageUpload();

  useEffect(() => {
    if (initialData) {
      setEditTitle(initialData.title);
      setEditContent(initialData.content);
      setEditThumbnail(initialData.thumbnail);
      setEditTags(initialData.tags ? initialData.tags.map(tag => tag.name) : []);
    }
  }, [initialData]);

  const handleAddTag = () => {
    const tag = editTagInput.trim();
    if (tag && !editTags.includes(tag)) {
      setEditTags([...editTags, tag]);
      setEditTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditTags(editTags.filter(t => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editTagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageUploadChange = async (file: File) => {
    const imageUrl = await handleImageUpload(file);
    if (imageUrl) {
      setEditThumbnail(imageUrl);
    }
  };

  const resetEditForm = () => {
    if (initialData) {
      setEditTitle(initialData.title);
      setEditContent(initialData.content);
      setEditThumbnail(initialData.thumbnail);
      setEditTags(initialData.tags ? initialData.tags.map(tag => tag.name) : []);
    }
    setIsEditing(false);
  };

  return {
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
  };
}; 