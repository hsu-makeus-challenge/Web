import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../apis/axios";
import type { LpDataType } from "../../types/lp";

export interface LpPage {
  data: LpDataType[];
  nextCursor?: number;
  hasNext?: boolean;
}

interface UseInfiniteTagSearchLpsProps {
  tagName: string;
  order: "asc" | "desc";
}

const fetchTagLps = async ({ pageParam = 0, tagName, order }: { pageParam: number; tagName: string; order: "asc" | "desc" }) => {
  const response = await axios.get(`/v1/lps/tag/${tagName}?cursor=${pageParam}&limit=12&order=${order}`);
  return response.data.data;
};

export const useInfiniteTagSearchLps = ({ tagName, order }: UseInfiniteTagSearchLpsProps) => {
  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["tagLps", tagName, order],
    queryFn: ({ pageParam }) => fetchTagLps({ pageParam: pageParam as number, tagName, order }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
  });
};
