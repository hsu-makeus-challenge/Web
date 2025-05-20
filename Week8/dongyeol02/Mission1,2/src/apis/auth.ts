import {
  RequestSigninDto,
  RequestSignupDto,
  RequestUpdateProfileDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

//회원가입
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};
// 로그인
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

//마이페이지 수정

export const patchUpdateProfile = async (payload: RequestUpdateProfileDto) => {
  const { data } = await axiosInstance.patch("/v1/users/", payload);
  return data;
};
//useMuate용 로그인
export const signin = async (loginInfo: RequestSigninDto) => {
  const { data } = await axiosInstance.post("/v1/auth/signin", loginInfo);
  return data;
};

// 탈퇴
export const deleteMe = async () => {
  const res = await axiosInstance.delete("/v1/users");
  return res.data;
};
//useMutate 로그아웃
export const postLogout = async () => {
  const res = await axiosInstance.post("/v1/auth/signout");
  return res.data;
};
// 닉네임 변경
export const updateNicknameFn = async (nickname: string) => {
  return patchUpdateProfile({ name: nickname });
};
