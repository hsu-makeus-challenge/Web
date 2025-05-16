import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "@hooks/use-auth";
import { useLpLike } from "@hooks/use-lp-like";
import type { Like, Tag } from "@typedefs/lp";

export interface LpContentsProps {
	content: string;
	likes: Like[];
	tags: Tag[];
	lpId: number;
}

const LpContents = ({ content, likes, tags, lpId }: LpContentsProps) => {
	const { isAuthenticated } = useAuth();
	const { isLiked, likeCount, handleToggleLike, isPending } = useLpLike({
		lpId,
		initialLikes: likes,
	});

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
				disabled={isPending}
				title={isAuthenticated ? "좋아요 토글" : "로그인이 필요합니다"}
			>
				{isLiked ? (
					<FaHeart
						className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
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
