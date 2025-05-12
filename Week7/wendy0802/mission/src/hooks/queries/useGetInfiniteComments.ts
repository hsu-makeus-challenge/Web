import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../api/lp";
import { CommentResponse } from "../../types/lp";
import axios from "axios";

interface UseInfiniteCommentsParams {
  lpId: string | number;
  order?: "desc" | "asc";
  limit?: number;
}

export default function useGetInfiniteComments({ lpId, order = "desc", limit = 10 }: UseInfiniteCommentsParams) {
  console.log("[댓글 훅] 초기화:", { lpId, order, limit });
  
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("[댓글 훅] 쿼리 함수 실행:", { lpId, pageParam, order, limit });
      
      // localStorage에서 토큰 확인
      const token = localStorage.getItem('accessToken');
      console.log("[댓글 훅] 토큰 상태:", token ? "토큰 있음" : "토큰 없음");
      
      try {
        const result = await getComments(lpId, { cursor: pageParam, order, limit });
        console.log("[댓글 훅] 쿼리 성공:", result);
        
        // 데이터가 더미 데이터인지 확인
        if (result.message?.includes("더미 데이터")) {
          console.log("[댓글 훅] 더미 데이터가 반환되었습니다.");
        }
        
        return result;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("[댓글 훅] API 오류:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            message: error.message,
            baseURL: error.config?.baseURL || 'undefined',
            method: error.config?.method || 'undefined'
          });

          // 환경 변수 확인 로그
          console.log("[댓글 훅] 환경 변수 확인:", {
            VITE_API_URL: import.meta.env.VITE_API_URL || '(환경 변수 없음)',
            mode: import.meta.env.MODE || 'unknown'
          });
        } else {
          console.error("[댓글 훅] 일반 오류:", error);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage: CommentResponse) => {
      console.log("[댓글 훅] 다음 페이지 파라미터 계산:", { 
        nextCursor: lastPage.data.nextCursor, 
        hasNext: lastPage.data.hasNext 
      });
      
      // nextCursor가 null인지 명시적으로 확인하고, hasNext가 true일 때만 다음 파라미터 반환
      if (lastPage.data.hasNext === true && lastPage.data.nextCursor !== null) {
        console.log("[댓글 훅] 다음 페이지 있음, 커서:", lastPage.data.nextCursor);
        return lastPage.data.nextCursor;
      }
      
      console.log("[댓글 훅] 다음 페이지 없음");
      return undefined;
    },
    initialPageParam: 0,
  });
} 