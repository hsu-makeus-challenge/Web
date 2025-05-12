import { axiosInstance } from "@apis/config/instance";
import type { CommentResponse, GetCommentsParams } from "@typedefs/comment";

export const getComments = async ({
  lpId,
  cursor = null,
  limit = 10,
  order = "asc",
}: GetCommentsParams): Promise<CommentResponse> => {
  try {
    const params = new URLSearchParams();

    if (cursor !== null) params.append("cursor", cursor.toString());
    if (limit) params.append("limit", limit.toString());
    if (order) params.append("order", order);

    const url = `lps/${lpId}/comments?${params.toString()}`;
    const response = await axiosInstance.get<CommentResponse>(url);

    return response.data;
  } catch (error) {
    console.log("🚀 ~ getComments ~ error:", error);
    throw error;
  }
};