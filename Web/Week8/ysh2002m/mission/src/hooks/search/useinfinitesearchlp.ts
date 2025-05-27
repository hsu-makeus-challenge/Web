import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../apis/axios";
import type { LpDataType } from "../../types/lp";

export interface LpPage {
  data: LpDataType[];
  nextCursor?: number;
  hasNext?: boolean;
}

interface UseInfiniteSearchLpsProps {
  searchType: "title" | "tag";
  keyword: string;
  order: "asc" | "desc";
}

const fetchSearchLps = async ({
  pageParam = 0,
  searchType,
  keyword,
  order,
}: { pageParam: number } & UseInfiniteSearchLpsProps) => {
  if (searchType === "tag") {
    const response = await axios.get(`/v1/lps/tag/${keyword}`, {
      params: { cursor: pageParam, order },
    });
    return response.data.data;
  } else {
    const response = await axios.get(`/v1/lps`, {
      params: { cursor: pageParam, search: keyword, order },
    });
    return response.data.data;
  }
};

export const useInfiniteSearchLps = ({ searchType, keyword, order }: UseInfiniteSearchLpsProps) => {
  return useInfiniteQuery<LpPage, Error>({
    queryKey: ["searchLps", searchType, keyword, order],
    queryFn: ({ pageParam = 0 }) =>
        fetchSearchLps({ pageParam: pageParam as number, searchType, keyword, order }),      
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 0,
    enabled: !!keyword,
  });
};
