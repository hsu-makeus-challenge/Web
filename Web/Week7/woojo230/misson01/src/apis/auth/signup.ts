// src/apis/auth/signup.ts
import axios from '../auth/axios';

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  profileImage: File | null;
}

export const signUpUser = async ({
  email,
  password,
  nickname,
  profileImage,
}: SignUpPayload) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', nickname);
  formData.append('bio', '안녕하세요. 저는 매튜입니다.');
  if (profileImage) {
    formData.append('avatar', profileImage);
  }

  const response = await axios.post('/v1/auth/signup', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
