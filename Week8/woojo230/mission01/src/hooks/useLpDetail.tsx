import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LpDetailFetch } from '../apis/lp/lpDetailFetch';
import useUpdateLpDetailData from './queries/useUpdateLpDetailData';
import { handleThumbnailChange as handleThumbnailChangeUtil } from '../utils/lpModal/lpModalUtils';
import type { LpDetailDataType } from '../type/type';

export const useLpDetail = (lpId: number) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const { updateLpDetailData, deleteLpDetailData, isUpdating, isDeleting } =
    useUpdateLpDetailData();

  const {
    data: lpDetailData,
    isLoading,
    isFetching,
    error,
  } = useQuery<LpDetailDataType>({
    queryKey: ['lpDetail', lpId],
    queryFn: () => LpDetailFetch(lpId),
  });

  useEffect(() => {
    if (lpDetailData) {
      setContent(lpDetailData.content);
      setTitle(lpDetailData.title);
      setThumbnailPreview(lpDetailData.thumbnail);
      setThumbnail(lpDetailData.thumbnail);
    }
  }, [lpDetailData]);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleThumbnailChangeUtil(file, setThumbnailPreview, setThumbnail);
    }
  };

  const handleSubmit = (onSuccess: () => void) => {
    if (!title || !content) {
      return;
    }

    updateLpDetailData(
      {
        lpId: lpId,
        lpDetailData: {
          title: title || '',
          content: content || '',
          thumbnail: thumbnail || lpDetailData?.thumbnail || '',
        },
      },
      {
        onSuccess,
      }
    );
  };

  return {
    lpDetailData,
    isLoading,
    isFetching,
    isUpdating,
    isDeleting,
    error,
    content,
    title,
    thumbnailPreview,
    handleContentChange,
    handleTitleChange,
    handleThumbnailChange,
    handleSubmit,
    deleteLpDetailData,
  };
};
