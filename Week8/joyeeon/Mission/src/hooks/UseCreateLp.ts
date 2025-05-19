
import { createLp } from "../apis/lps";
import type { CreateLpData } from "../types/createLp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateLp = () => {
    return useMutation({
        mutationFn: (data: CreateLpData) => createLp(data),
        onSuccess: (response) => {
            console.log("LP 생성 성공:", response.data);
            toast.success("LP 생성 성공");
        },
        onError: (error) => {
            console.error("LP 생성 실패:", error);
            toast.error("LP 생성 실패");
        },
    });
}