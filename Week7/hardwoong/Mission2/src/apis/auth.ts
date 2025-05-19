import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSingupDto,
} from '../types/auth.ts';
import { axiosInstance } from './axios.ts';

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSingupDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signup', body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signin', body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get('/v1/users/me');
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post('/v1/auth/signout');

  return data;
}

export const updateUserInfo = async ({
  name,
  bio,
  avatar,
}: {
  name: string;
  bio?: string;
  avatar?: string;
}): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch('/v1/users', {
    name,
    bio,
    avatar,
  });
  return data;
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("/v1/users");
};