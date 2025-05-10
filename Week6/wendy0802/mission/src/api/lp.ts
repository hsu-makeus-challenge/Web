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

export const getLPDetail = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.get(`v1/lps/${id}`);
    return data;
};

export const getComments = async (lpId: string | number, params: { cursor?: number; limit?: number; order?: 'asc' | 'desc' }) => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}/comments`, {
    params,
  });
  return data;
};

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const response = await axiosInstance.post<ResponseRefreshDto>(
      `${import.meta.env.VITE_API_URL}/v1/auth/refresh`,
      { refreshToken } as RequestRefreshDto
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setTokens(accessToken, newRefreshToken);
    return true;
  } catch (error) {
    removeTokens();
    // 여기서 명확하게 로그인 페이지로 이동!
    window.location.href = import.meta.env.VITE_API_URL + "/v1/auth/google/login";
    return false;
  }
};
