import { axiosInstance } from './axios';
import {
  LpDetailResponse,
  CommentsResponse,
  LpDetailData,
} from '../types/lp-detail';
import { PaginationDto } from '../types/common';

export const getLpDetail = async (id: string): Promise<LpDetailData> => {
  const { data } = await axiosInstance.get<LpDetailResponse>(`/v1/lps/${id}`);
  return data.data;
};

export const getComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: {
  lpId: string;
} & PaginationDto): Promise<CommentsResponse> => {
  const { data } = await axiosInstance.get<CommentsResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    }
  );
  return data;
};

export const createComment = async (
  lpId: string,
  content: string
): Promise<Comment> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data.data;
};
