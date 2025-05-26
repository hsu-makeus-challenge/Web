import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "@apis/lp/lp";
import { useAuth } from "@hooks/auth/use-auth";
import { useUserInfo } from "@hooks/user/use-user-info";
import type { Like } from "@typedefs/lp";

interface UseLpLikeParams {
	lpId: number;
	initialLikes: Like[];
}

export const useLpLike = ({ lpId, initialLikes }: UseLpLikeParams) => {
	const queryClient = useQueryClient();
	const { isAuthenticated } = useAuth();
	const { data: userInfo } = useUserInfo();
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(initialLikes.length);

	useEffect(() => {
		if (isAuthenticated && userInfo?.data) {
			const userLiked = initialLikes.some(
				(like) => like.userId === userInfo.data.id,
			);
			setIsLiked(userLiked);
		}
		setLikeCount(initialLikes.length);
	}, [initialLikes, isAuthenticated, userInfo]);

	const addLikeMutation = useMutation({
		mutationFn: () => addLike(lpId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["lp", lpId.toString()] });
			const previousLp = queryClient.getQueryData(["lp", lpId.toString()]);

			if (userInfo?.data) {
				queryClient.setQueryData(["lp", lpId.toString()], (oldData: any) => {
					if (!oldData) return oldData;

					const newLike = {
						id: Date.now(),
						userId: userInfo.data.id,
						lpId: lpId,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						user: {
							id: userInfo.data.id,
							name: userInfo.data.name,
							avatar: userInfo.data.avatar,
						},
					};

					return {
						...oldData,
						data: {
							...oldData.data,
							likes: [...oldData.data.likes, newLike],
						},
					};
				});
			}

			setIsLiked(true);
			setLikeCount((prev) => prev + 1);

			return { previousLp };
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lp", lpId.toString()] });
		},

		onError: (error, _, context: any) => {
			if (context?.previousLp) {
				queryClient.setQueryData(["lp", lpId.toString()], context.previousLp);
			}
			setIsLiked(false);
			setLikeCount((prev) => prev - 1);

			console.error("좋아요 추가 중 오류 발생:", error);
			alert("좋아요 추가에 실패했습니다.");
		},
	});

	const removeLikeMutation = useMutation({
		mutationFn: () => removeLike(lpId),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["lp", lpId.toString()] });
			const previousLp = queryClient.getQueryData(["lp", lpId.toString()]);

			if (userInfo?.data) {
				queryClient.setQueryData(["lp", lpId.toString()], (oldData: any) => {
					if (!oldData) return oldData;

					const updatedLikes = oldData.data.likes.filter(
						(like: Like) => like.userId !== userInfo.data.id,
					);

					return {
						...oldData,
						data: {
							...oldData.data,
							likes: updatedLikes,
						},
					};
				});
			}

			setIsLiked(false);
			setLikeCount((prev) => Math.max(0, prev - 1));

			return { previousLp };
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lp", lpId.toString()] });
		},

		onError: (error, _, context: any) => {
			if (context?.previousLp) {
				queryClient.setQueryData(["lp", lpId.toString()], context.previousLp);
			}
			setIsLiked(true);
			setLikeCount((prev) => prev + 1);

			console.error("좋아요 취소 중 오류 발생:", error);
			alert("좋아요 취소에 실패했습니다.");
		},
	});

	const handleToggleLike = () => {
		if (!isAuthenticated) {
			alert("좋아요를 누르려면 로그인이 필요합니다.");
			return;
		}

		if (isLiked) {
			removeLikeMutation.mutate();
		} else {
			addLikeMutation.mutate();
		}
	};

	return {
		isLiked,
		likeCount,
		handleToggleLike,
		isPending: addLikeMutation.isPending || removeLikeMutation.isPending,
	};
};
