import { useQueryClient, useQuery } from "@tanstack/react-query";
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

  const liked = likes?.some((like) => like.userId === userId);

  const postLikeMutation = usePostLike();
  const deleteLikeMutation = useDeleteLike();

  const handleClick = () => {
    if (!userId || !lpId) {
      console.warn("Missing userId or lpId");
      return;
    }

    if (liked) {
      if (deleteLikeMutation.isPending) return;
      deleteLikeMutation.mutate(
        { lpId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["lps", lpId],
              exact: true,
            });
          },
          onError: (error) => {
            console.error("Failed to delete like:", error);
          },
        }
      );
    } else {
      if (postLikeMutation.isPending) return;
      postLikeMutation.mutate(
        { lpId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["lps", lpId],
              exact: true,
            });
          },
          onError: (error) => {
            console.error("Failed to post like:", error);
          },
        }
      );
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className={`flex items-center ${
          liked ? "text-pink-400" : "text-gray-400"
        } text-[11px] px-2 py-0.5 rounded-full gap-1 tracking-wide bg-[#282828] hover:opacity-80`}
      >
        <span>❤️</span>
        <span>{likes?.length || 0}</span>
      </button>
    </div>
  );
};

export default LpLikeDisplay;