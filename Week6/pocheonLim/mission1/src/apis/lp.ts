import axios from 'axios';

export interface Lp {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes?: { id: number }[];
}

export interface LpListResponse {
  data: {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export const fetchLpList = async ({
  cursor = 0,
  limit = 20,
  order = 'asc',
}: { cursor?: number; limit?: number; order?: string }) => {
  const res = await axios.get<LpListResponse>(
    `/v1/lps?cursor=${cursor}&limit=${limit}&order=${order}`
  );
  console.log('API 응답:', res.data);
  return Array.isArray(res.data?.data?.data) ? res.data.data.data : [];
}; 