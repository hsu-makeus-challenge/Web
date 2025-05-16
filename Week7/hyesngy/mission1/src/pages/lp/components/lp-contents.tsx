import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, removeLike } from "@apis/lp/lp";
import { useAuth } from "@hooks/use-auth";
import { useUserInfo } from "@hooks/use-user-info";
import type { Like, Tag } from "@typedefs/lp";

export interface LpContentsProps {
	content: string;
	likes: Like[];
	tags: Tag[];
	lpId: number;
}

const LpContents = ({ content, likes, tags, lpId }: LpContentsProps) => {
	const queryClient = useQueryClient();
	const { isAuthenticated } = useAuth();
	const { data: userInfo } = useUserInfo();
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(likes.length);

	useEffect(() => {
		if (isAuthenticated && userInfo?.data) {
			const userLiked = likes.some((like) => like.userId === userInfo.data.id);
			setIsLiked(userLiked);
		}
	}, [likes, isAuthenticated, userInfo]);

	const addLikeMutation = useMutation({
		mutationFn: () => addLike(lpId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lp", lpId.toString()] });
			setIsLiked(true);
			setLikeCount((prev) => prev + 1);
		},
		onError: (error) => {
			console.error("좋아요 추가 중 오류 발생:", error);
			alert("좋아요 추가에 실패했습니다.");
		},
	});

	const removeLikeMutation = useMutation({
		mutationFn: () => removeLike(lpId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lp", lpId.toString()] });
			setIsLiked(false);
			setLikeCount((prev) => Math.max(0, prev - 1));
		},
		onError: (error) => {
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

	return (
		<>
			<p className="text-left w-full whitespace-pre-wrap">{content}</p>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						key={tag.id}
						className="px-3 py-1 bg-zinc-600 rounded-full text-sm"
					>
						{tag.name}
					</span>
				))}
			</div>

			<button
				type="button"
				className="flex items-center gap-2 focus:outline-none"
				onClick={handleToggleLike}
				disabled={addLikeMutation.isPending || removeLikeMutation.isPending}
				title={isAuthenticated ? "좋아요 토글" : "로그인이 필요합니다"}
			>
				{isLiked ? (
					<FaHeart
						className="text-red-500 hover:text-red-400 transition-colors curdor-pointer"
						size={20}
					/>
				) : (
					<FaRegHeart
						className="hover:text-red-400 transition-colors cursor-pointer"
						size={20}
					/>
				)}
				<span>{likeCount}</span>
			</button>
		</>
	);
};

export default LpContents;
