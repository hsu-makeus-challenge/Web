import type { Like, Tag } from "@typedefs/lp";

export interface LpContentsProps {
	content: string;
	likes: Like[];
	tags: Tag[];
}

const LpContents = ({ content, likes, tags }: LpContentsProps) => {
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

			<p>♥️ {likes.length}</p>
		</>
	);
};

export default LpContents;
