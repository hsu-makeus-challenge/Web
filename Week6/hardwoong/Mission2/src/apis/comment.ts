import { PaginationDto } from "../types/common";
import { ResponseCommentListDto } from "../types/comment";
import {axiosInstance} from "./axios.ts";

export const getCommentList = async (
  lpId: number,
  paginationDto: PaginationDto
): Promise<ResponseCommentListDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};