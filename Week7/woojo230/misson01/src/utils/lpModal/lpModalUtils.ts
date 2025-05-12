import instance from '../../apis/auth/axios';

export const handleAddTag = (
  tagInput: string,
  tags: string[],
  setTags: (tags: string[]) => void,
  setTagInput: (input: string) => void
) => {
  const trimmed = tagInput.trim();
  if (trimmed && !tags.includes(trimmed)) {
    setTags([...tags, trimmed]);
    setTagInput('');
  }
};

export const handleThumbnailChange = async (
  file: File,
  setThumbnailPreview: (url: string) => void,
  setThumbnail: (url: string) => void
) => {
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
};

export const validateForm = (
  title: string,
  content: string,
  thumbnail: string,
  tags: string[]
): boolean => {
  if (
    !title.trim() ||
    !content.trim() ||
    !thumbnail.trim() ||
    tags.length === 0
  ) {
    alert('모든 항목을 입력해주세요!');
    return false;
  }
  return true;
};
