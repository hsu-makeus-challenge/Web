import { AuthAPI } from "./authAxios";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await AuthAPI.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.imageUrl;
};
