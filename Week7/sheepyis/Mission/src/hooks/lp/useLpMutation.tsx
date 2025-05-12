import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
};

export const useLpMutation = () => {
  return useMutation({
    mutationFn: async ({ title, content, thumbnail, tags }: CreateLpDto) => {
      const res = await AuthAPI.post("/lps", {
        title,
        content,
        thumbnail,
        tags,
        published: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("생성 성공", data);
      alert("LP가 등록되었습니다.");
      // window.location.reload();
    },
  });
};
