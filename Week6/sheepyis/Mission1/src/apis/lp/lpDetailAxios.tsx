import { AuthAPI } from "../authAxios";

export const LPDetailAPI = async (id: string | undefined) => {
  const response = await AuthAPI.get(`/lps/${id}`);
  return response.data.data;
};
