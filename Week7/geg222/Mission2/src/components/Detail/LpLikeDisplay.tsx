import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import usePostLike from "../../hooks/mutations/usePostLike";
import { getMyInfo } from "../../apis/auth";

interface LpLikeDisplayProps {
  lpId: number;
  likes: { userId: number }[];
}

const LpLikeDisplay = ({ lpId, likes }: LpLikeDisplayProps) => {
  const queryClient = useQueryClient();
  const { data: me } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });
  const userId = me?.data.id;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLiked(likes.some((like) => like.userId === userId));
    setLikeCount(likes.length);
  }, [likes, userId]);

  const postLikeMutation = usePostLike();
  const deleteLikeMutation = useDeleteLike();

  const handleLikeLp = () => {
    setLiked(true);
    setLikeCount((prev) => prev + 1);
    postLikeMutation.mutate(
      { lpId },
      {
        onError: () => {
          setLiked(false);
          setLikeCount((prev) => prev - 1);
        },
      }
    );
  };

  const handleDislikeLp = () => {
    setLiked(false);
    setLikeCount((prev) => prev - 1);
    deleteLikeMutation.mutate(
      { lpId },
      {
        onError: () => {
          setLiked(true);
          setLikeCount((prev) => prev + 1);
        },
      }
    );
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={liked ? handleDislikeLp : handleLikeLp}
        className="flex items-center text-white text-base gap-1 hover:opacity-80 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={liked ? "#ffffff" : "#888888"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.001 4.529c2.349-2.285 6.149-2.285 8.498 0 2.34 2.276 2.34 5.969 0 8.245l-7.205 7.02a1 1 0 01-1.414 0l-7.205-7.02c-2.34-2.276-2.34-5.969 0-8.245 2.349-2.285 6.149-2.285 8.531 0z"
          />
        </svg>
        <span className="text-sm">{likeCount}</span>
      </button>
    </div>
  );
};

export default LpLikeDisplay;