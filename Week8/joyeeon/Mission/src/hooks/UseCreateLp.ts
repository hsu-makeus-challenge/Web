
import { createLp } from "../apis/lps";
import type { CreateLpData } from "../types/createLp";
import { useMutation } from "@tanstack/react-query";

export const useCreateLp = () => {
    return useMutation({
        mutationFn: (data: CreateLpData) => createLp(data),
        onSuccess: (response) => {
            console.log("LP 생성 성공:", response.data);
        },
        onError: (error) => {
            console.error("LP 생성 실패:", error);
        },
    });
}