import { PaginationDto } from "../types/common.ts";
import { axiosInstance } from "./axios.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<PaginationDto> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: { ...paginationDto, limit: paginationDto.limit ?? 30 },
  });

  return data;
};

export const getLpListByUser = async (
  userId: string,
  paginationDto: PaginationDto
): Promise<PaginationDto> => {
  const { data } = await axiosInstance.get(`v1/lps/user/${userId}`, {
    params: { ...paginationDto, limit: paginationDto.limit ?? 30 },
  });

  return data;
};

export const getLpById = async (lpId: string) => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}`);
  return data;
};

export const postLikeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.post(`/v1/lps/${lpId}/likes`, {
    headers: {
      Authorization: `Bearer`,
    },
  });
};

export const deleteLikeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}/likes`, {
    headers: {
      Authorization: `Bearer`,
    },
  });
};


export const getUserById = async (userId: string) => {
  const { data } = await axiosInstance.get(`/v1/users/${userId}`);
  return data;
};
