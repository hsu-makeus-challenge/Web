// src/apis/comments.ts

import { axiosInstance } from "./axios";
import { Comment, ResponseCommentDto } from "../types/comment";

export const getCommentsByLpId = async ({
  lpId,
  cursor,
  order,
}: {
  lpId: string;
  cursor?: number;
  order: "asc" | "desc";
}): Promise<{
  data: Comment[]; // 실제 댓글 배열
  nextCursor?: number; // 다음 페이지 커서
  hasNext: boolean; // 더 불러올 게 있는지 여부
}> => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      order,
    },
  });
  console.log("🔍 댓글 API 응답:", res.data.data);
  return {
    data: res.data.data.data as Comment[], // 댓글 배열
    nextCursor: res.data.data.nextCursor, // 다음 커서
    hasNext: res.data.data.hasNext, // 다음 페이지 존재 여부
  };
};

export const postComment = async ({
  lpId,
  content,
}: {
  lpId: string;
  content: string;
}): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

export const deleteComment = async (lpId: string, commentId: number) => {
  return axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};

export const updateComment = async (
  lpId: string,
  commentId: number,
  content: string
) => {
  return await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
    content,
  });
};
