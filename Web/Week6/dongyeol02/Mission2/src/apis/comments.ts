// src/apis/comments.ts

import { Comment } from "../types/comment";
import { axiosInstance } from "./axios";

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

  return {
    data: res.data.data.data, // 댓글 배열
    nextCursor: res.data.data.nextCursor, // 다음 커서
    hasNext: res.data.data.hasNext, // 다음 페이지 존재 여부
  };
};
