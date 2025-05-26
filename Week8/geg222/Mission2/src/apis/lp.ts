import { RequestUpdateUserDto, ResponseUpdateUserDto } from "../types/user.ts";
import { RequestUpdateLpDto, ResponseUpdateLpDto } from "../types/lp.ts";
import { PaginationDto } from "../types/common.ts";
import {
  RequestCreateLpDto,
  RequestLpDto,
  ResponseLikeLpDto,
  ResponseLpDto,
} from "../types/lp.ts";
import { axiosInstance } from "./axios.ts";
import {
  RequestUpdateCommentDto,
  ResponseUpdateCommentDto,
} from "../types/lp.ts";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<PaginationDto> => {
  const { data } = await axiosInstance.get("v1/lps", {
    params: { ...paginationDto, limit: paginationDto.limit ?? 30 },
  });

  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}`);
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

export const getUserById = async (userId: string) => {
  const { data } = await axiosInstance.get(`/v1/users/${userId}`);
  return data;
};

export const getLpCommentsById = async (
  lpId: number,
  paginationDto: PaginationDto
): Promise<PaginationDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { ...paginationDto },
  });

  return data;
};

export const postLpComment = async (
  lpId: number,
  content: string
): Promise<void> => {
  await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
};

export const postLp = async (
  lpData: RequestLpDto & { file?: File }
): Promise<RequestCreateLpDto> => {
  let thumbnail = lpData.thumbnail ?? "";

  try {
    if (lpData.file) {
      const formData = new FormData();
      formData.append("file", lpData.file);

      const uploadResponse = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      thumbnail = uploadResponse.data?.data?.url ?? thumbnail;
    }
  } catch (uploadError) {
    console.error("이미지 업로드 실패:", uploadError);
    // 이미지 업로드 실패해도 진행할 경우 thumbnail을 빈 문자열로 유지
  }

  try {
    const { data } = await axiosInstance.post("/v1/lps", {
      ...lpData,
      thumbnail,
    });
    return data;
  } catch (createError) {
    console.error("LP 생성 실패:", createError);
    throw createError;
  }
};

export const patchLp = async (
  lpId: number,
  updateData: RequestUpdateLpDto & { file?: File }
): Promise<ResponseUpdateLpDto> => {
  let thumbnail = updateData.thumbnail ?? "";

  try {
    if (updateData.file) {
      const formData = new FormData();
      formData.append("file", updateData.file);

      const uploadResponse = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      thumbnail = uploadResponse.data?.data?.imageUrl ?? thumbnail;
    }
  } catch (uploadError) {
    console.error("이미지 업로드 실패:", uploadError);
  }

  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, {
    ...updateData,
    thumbnail,
  });

  return data;
};

export const patchLpComment = async (
  lpId: number,
  commentId: number,
  updateData: RequestUpdateCommentDto
): Promise<ResponseUpdateCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    updateData
  );
  return data;
};

export const deleteLpComment = async (
  lpId: number,
  commentId: number
): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};

export const deleteLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/v1/lps/${lpId}`);
};
