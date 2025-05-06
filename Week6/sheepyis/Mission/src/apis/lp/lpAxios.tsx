import { AuthAPI } from "../authAxios";
import type { LpResponse } from "../../types/lp";

export const LpAPI = async (
  order: "asc" | "desc",
  cursor: number | null,
  limit: number
): Promise<LpResponse> => {
  const response = await AuthAPI.get("/lps", {
    params: { order, cursor, limit },
  });
  return response.data.data;
};