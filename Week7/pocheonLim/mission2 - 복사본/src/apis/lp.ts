import { Lp } from '../types/lp';
import { axiosInstance } from './auth';

interface FetchLpListParams {
  order?: 'asc' | 'desc';
  cursor?: number;
  limit?: number;
  search?: string;
}

interface LpListResponse {
  data: {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
  };
}

interface FetchCommentsParams {
  lpId: string | number;
  order?: 'asc' | 'desc';
  cursor?: number;
  limit?: number;
}

export const fetchLpList = async ({ order = 'desc', cursor = 0, limit = 10, search }: FetchLpListParams = {}) => {
  const searchParams = new URLSearchParams({
    order,
    cursor: cursor.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const url = `${import.meta.env.VITE_SERVER_API_URL}/v1/lps?${searchParams.toString()}`;

  try {
    // 스켈레톤 보려고 느리게 했습니당.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, response.statusText);
      throw new Error(`요청 실패 봐라 (${response.status}): ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`틀렸다네;;: ${contentType}`);
    }

    const data = await response.json();
    return data.data as LpListResponse['data'];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`과연: ${error.message}`);
    }
    throw new Error('오류입니다');
  }
};

export const fetchComments = async ({
  lpId,
  order = 'asc',
  cursor = 0,
  limit = 10,
}: FetchCommentsParams) => {
  // 이거도 확인 위해서 느리게
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const searchParams = new URLSearchParams({
    order,
    cursor: cursor.toString(),
    limit: limit.toString(),
  });
  const url = `/v1/lps/${lpId}/comments?${searchParams.toString()}`;
  const res = await axiosInstance.get(url);
  const data = res.data;
  return {
    data: data.data.data,
    nextCursor: data.data.nextCursor,
    hasNext: data.data.hasNext,
  };
};

export interface CreateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface CreateLpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const createLp = async (
  lpData: CreateLpRequest,
): Promise<CreateLpResponse> => {
  try {
    console.log("createLp lpData:", lpData); 
    const response = await axiosInstance.post<CreateLpResponse>("/v1/lps", lpData);
    return response.data;
  } catch (error) {
    console.log("❌ ~ createLp ~ error:", error);
    throw error;
  }
};

export interface FetchUserLpListParams {
  order?: 'asc' | 'desc';
  cursor?: number;
  limit?: number;
}

export interface UserLpListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export const fetchUserLpList = async ({ order = 'desc', cursor = 0, limit = 10 }: FetchUserLpListParams = {}) => {
  const searchParams = new URLSearchParams({
    order,
    cursor: cursor.toString(),
    limit: limit.toString(),
  });
  const res = await axiosInstance.get(`/v1/lps/user?${searchParams.toString()}`);
  return res.data as UserLpListResponse;
};

// 댓글 수정
export const updateComment = (lpId: number, commentId: number, content: string) =>
  axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });

// 댓글 삭제
export const deleteComment = (lpId: number, commentId: number) =>
  axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

// LP 수정
export interface UpdateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface UpdateLpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Lp;
}

export const updateLp = async (
  lpId: number,
  data: UpdateLpRequest
): Promise<UpdateLpResponse> => {
  const res = await axiosInstance.patch(`/v1/lps/${lpId}`, data);
  return res.data;
};

export const deleteLp = async (lpId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return response.data;
};

// 좋아요 추가
export const addLike = async (lpId: number) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return response.data;
};

// 좋아요 취소
export const removeLike = async (lpId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return response.data;
};

// 댓글 생성
export const createComment = (lpId: number, content: string) =>
  axiosInstance.post(`/v1/lps/${lpId}/comments`, { content }); 