import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, deleteLike } from "../../apis/lp";
import useGetMyInfo from "./useGetMyInfo";
import { QUERY_KEY } from "../../constants/key";

interface UseLpLikeToggleProps {
  lpId: number;
  likes: { userId: number }[];
}

function useLpLikeToggle({ lpId, likes }: UseLpLikeToggleProps) {
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem("accessToken");
  const { data: me } = useGetMyInfo(accessToken || "");
  const userId = me?.data.id;

  const isInitiallyLiked = likes?.some((like) => like.userId === userId);
  const [liked, setLiked] = useState(isInitiallyLiked);

  const { mutate } = useMutation({
    mutationFn: () => (liked ? deleteLike({ lpId }) : postLike({ lpId })),
    onMutate: () => {
      setLiked((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
    },
    onError: () => {
      setLiked((prev) => !prev);
    },
  });

  return { liked, toggleLike: mutate };
}

export default useLpLikeToggle;
