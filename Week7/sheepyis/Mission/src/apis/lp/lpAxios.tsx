import { AuthAPI } from "../authAxios";
import type { LpResponse } from "../../types/lp";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const LpAPI = async (
  order: "asc" | "desc",
  cursor: number | null,
  limit: number,
  search?: string
): Promise<LpResponse> => {
  const res = await AuthAPI.get("/lps", {
    params: {
      order,
      cursor,
      limit,
      ...(search ? { search } : {}),
    },
  });

  await delay(500);

  return res.data.data;
};
