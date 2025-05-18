import { motion } from "motion/react";

const CommentSkeleton = () => {
	return (
		<div className="flex gap-3 py-4 border-b border-zinc-700 overflow-hidden">
			<motion.div
				className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800"
				animate={{
					opacity: [0.5, 0.8, 0.5],
				}}
				transition={{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>

			<div className="flex-grow">
				<div className="mb-2 flex items-center gap-2">
					<motion.div
						className="h-4 w-20 bg-zinc-800 rounded"
						animate={{
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				</div>

				<div className="space-y-1">
					<motion.div
						className="h-3 w-full bg-zinc-800 rounded"
						animate={{
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 0.1,
						}}
					/>
					<motion.div
						className="h-3 w-3/4 bg-zinc-800 rounded"
						animate={{
							opacity: [0.5, 0.8, 0.5],
						}}
						transition={{
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
							delay: 0.3,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CommentSkeleton;
