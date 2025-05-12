import { useState } from "react";
import type { CommentOrderType } from "@typedefs/comment";
import { useInfiniteCommentsQuery } from "@hooks/use-infinite-comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@apis/comment/comment";
import CommentList from "./comment-list";
import OrderButtons from "@pages/home/components/order-buttons";

interface CommentSectionProps {
	lpId: string | number;
}

const CommentSection = ({ lpId }: CommentSectionProps) => {
	const [order, setOrder] = useState<CommentOrderType>("desc");
	const [commentContent, setCommentContent] = useState("");
	const queryClient = useQueryClient();

	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteCommentsQuery({ lpId, order });

	const createCommentMutation = useMutation({
		mutationFn: () => createComment(lpId, { content: commentContent }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
			setCommentContent("");
		},
		onError: (error) => {
			console.error("댓글 작성 중 오류 발생:", error);
			alert("댓글 작성 중 오류가 발생했습니다.");
		},
	});

	const handleOrderChange = (newOrder: CommentOrderType) => {
		setOrder(newOrder);
	};

	const handleCommentSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!commentContent.trim()) {
			alert("댓글 내용을 입력해주세요.");
			return;
		}

		createCommentMutation.mutate();
	};

	const comments = [];
	if (data) {
		for (const page of data.pages) {
			if (page.data?.data) {
				comments.push(...page.data.data);
			}
		}
	}

	if (isError) {
		return (
			<div className="text-red-500">
				댓글을 불러오는 중 오류가 발생했습니다.
			</div>
		);
	}

	return (
		<div className="w-full pt-8 flex flex-col gap-6">
			<div className="flex flex-row justify-between items-center">
				<h2 className="text-xl font-bold text-left">댓글</h2>
				<OrderButtons currentOrder={order} onOrderChange={handleOrderChange} />
			</div>

			<form
				onSubmit={handleCommentSubmit}
				className="mb-6 rounded-md flex justify-between items-center gap-2"
			>
				<input
					type="text"
					className="border w-full h-10 flex-1 text-white p-2 rounded-md bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
					placeholder="댓글을 입력해주세요..."
					value={commentContent}
					onChange={(e) => setCommentContent(e.target.value)}
					disabled={createCommentMutation.isPending}
				/>

				<button
					type="submit"
					disabled={createCommentMutation.isPending || !commentContent.trim()}
					className="px-4 py-2 bg-gray-100 text-black cursor-pointer hover:bg-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md transition-colors duration-200 ease-in-out"
				>
					{createCommentMutation.isPending ? "등록 중..." : "등록"}
				</button>
			</form>

			<CommentList
				comments={comments}
				isLoading={isLoading}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
				fetchNextPage={fetchNextPage}
				lpId={lpId}
			/>
		</div>
	);
};

export default CommentSection;
