import { useRef, useEffect } from "react";
import type { Comment } from "@typedefs/comment";
import CommentItem from "./comment-item";

interface CommentListProps {
	comments: Comment[];
	isLoading: boolean;
	isFetchingNextPage: boolean;
	hasNextPage: boolean | undefined;
	fetchNextPage: () => void;
	lpId: number | string;
}

const CommentList = ({
	comments,
	isFetchingNextPage,
	hasNextPage,
	fetchNextPage,
	lpId,
}: CommentListProps) => {
	const loaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 },
		);

		const currentLoaderRef = loaderRef.current;
		if (currentLoaderRef) {
			observer.observe(currentLoaderRef);
		}

		return () => {
			if (currentLoaderRef) {
				observer.unobserve(currentLoaderRef);
			}
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<div className="w-full">
			<div className="space-y-1">
				{comments.map((comment) => (
					<CommentItem key={comment.id} comment={comment} lpId={lpId} />
				))}
			</div>
		</div>
	);
};

export default CommentList;
