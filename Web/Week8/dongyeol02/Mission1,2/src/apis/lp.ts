import { PaginationDto } from "../types/common";
import {
  RequestCreateLpDto,
  RequestLpDto,
  ResponseCreateLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLpListDto,
} from "../types/lp";
import { axiosInstance } from "./axios";
export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

export const postLp = async (
  newLp: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", newLp);
  return data;
};
//Lp 수정
export const updateLp = async (
  lpId: number,
  data: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  }
) => {
  const res = await axiosInstance.patch(`/v1/lps/${lpId}`, data);
  return res.data;
};

export const deleteLp = async (lpId: number) => {
  const res = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return res.data;
};
