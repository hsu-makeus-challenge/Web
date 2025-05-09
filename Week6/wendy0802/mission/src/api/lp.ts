import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import { ResponseLpList } from "../types/lp";

export type CursorBaseResponse<T> = {};

// LP 리스트 조회
export const getLPList = async (paginationDto: PaginationDto): Promise<any> => {
    const { data } = await axiosInstance.get("v1/lps", {
      params: paginationDto,
    });
    return data;
};

// LP 상세 조회
export const getLPDetail = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.get(`v1/lps/${id}`);
    return data;
};
