import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../apis/lps";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useDeleteLp = () =>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (lpid: number) => deleteLp(lpid),
        onSuccess: (_, lpId) => {
            console.log(`LP ${lpId} 삭제 성공`);
            // 예: 목록 페이지에서 ["lpList"]를 사용 중이라면 이걸 무효화
            
            queryClient.invalidateQueries({ queryKey: ["lpList"] });
            navigate("/");
        },
        onError: (error) => {
            console.error("LP 삭제 실패:", error);
        },
    });
}