import { RequestSigninDto, RequestSignupDto, RequestUpdateUserDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSingupDto, ResponseUpdateUserDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSingupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup",body);

    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin",body);

    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me");

    return data;
};

export const postLogout = async () => {
    const {data} = await axiosInstance.post("/v1/auth/signout");
    return data;
};



export const patchUser = async (
  updateData: RequestUpdateUserDto & { file?: File }
): Promise<ResponseUpdateUserDto> => {
  let avatar = updateData.avatar;

  try {
    if (updateData.file) {
      const formData = new FormData();
      formData.append("file", updateData.file);

      const uploadResponse = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      avatar = uploadResponse.data?.data?.imageUrl ?? avatar;
    }
  } catch (uploadError) {
    console.error("이미지 업로드 실패:", uploadError);
  }

  try {
    const { data } = await axiosInstance.patch("/v1/users", {
      ...updateData,
      ...(avatar && { avatar }),
    });
    return data;
  } catch (updateError) {
    console.error("유저 정보 수정 실패:", updateError);
    throw updateError;
  }
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("/v1/users");
};