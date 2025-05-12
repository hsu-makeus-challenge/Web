import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../apis/imgupload";

export const useUploadImage = () => {
    return useMutation({
        mutationFn : uploadImage,
        onSuccess: (response) => {
            console.log("Image upload success:", response.data);
        },
        onError: (error) => {
            console.error("Image upload failed:", error);
        },

    });
};