import { axiosInstance } from './auth';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axiosInstance.post('/v1/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.data.imageUrl;
}; 