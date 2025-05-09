import { PaginationDto } from "../types/common";
import { Lp, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

export const getLpById = async (id: string): Promise<Lp> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data.data;
};
