import { api } from "./api";

interface UploadImageResponse {
    status: boolean;
    message: string;
    statusCode: number;
    data: {
        imageUrl: string;
    };
}

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await api.post("/uploads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}