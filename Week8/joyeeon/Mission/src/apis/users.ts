import {api} from './api';
import type { UpdateInfoPayload } from '../types/mypage';
const getAccessToken = () => localStorage.getItem("ACCESS_TOKEN");


export const getMyInfo = async () => {
    const token = getAccessToken();
    const response = await api.get('/users/me', {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  };


export const updateInfo = (
  updateData : UpdateInfoPayload
) =>{
  const token = getAccessToken();
  return api.patch('/users', updateData ,{
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

}