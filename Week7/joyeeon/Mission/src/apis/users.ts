import {api} from './api';


export const getMyInfo = async () => {
    const response = await api.get('/users/me');
    return response.data;
  };