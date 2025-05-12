import { AuthAPI } from "../authAxios";
import type { CommentResponse } from "../../types/comment";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LpCommentAPI = async (
  lpId: number,
  cursor: number | null,
  limit: number,
  order: "asc" | "desc" = "asc"
): Promise<CommentResponse> => {
  const res = await AuthAPI.get(`/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });

  await delay(500);

  return res.data.data;
};
