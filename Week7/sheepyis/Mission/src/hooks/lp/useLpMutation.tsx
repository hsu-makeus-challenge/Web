import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthAPI } from "../../apis/authAxios";

type CreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
};

export const useLpMutation = (onClose: () => void) => {
  const queryClient = useQueryClient();

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
      alert("LP가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
  });
};
