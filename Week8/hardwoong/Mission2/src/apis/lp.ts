import {PaginationDto} from "../types/common.ts";
import {axiosInstance} from "./axios.ts";
import {ResponseLikeLpDto, ResponseLpListDto} from "../types/lp.ts";
import { LpData } from "../types/LpData.ts";
import { CreateLpRequest } from "../types/lp.ts";
import { UpdateLpRequest } from "../types/lp.ts";

type lpId = Pick<LpData, "id">;

export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });


  return data;
};

export const getLpDetail = async (lpId: number): Promise<LpData> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data.data;
};

export const postLike = async ({ id }: lpId): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`v1/lps/${id}/likes`);
  return data;
};

export const deleteLike = async ({ id }: lpId): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`v1/lps/${id}/likes`);
  return data;
}

export const createLp = async (body: CreateLpRequest): Promise<LpData> => {
  const { data } = await axiosInstance.post('/v1/lps', body);
  return data.data;
};

export const updateLp = async (lpId: number, body: UpdateLpRequest): Promise<LpData> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data.data;
};

export const deleteLp = async (lpId: number): Promise<boolean> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data.data;
};

export const uploadThumbnail = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post('/v1/uploads', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return data.data.imageUrl;
};