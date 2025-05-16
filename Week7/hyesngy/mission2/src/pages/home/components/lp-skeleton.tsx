import { motion } from "motion/react";

const LpSkeleton = () => {
	return (
		<div className="relative w-45 h-45 bg-zinc-800 overflow-hidden">
			<motion.div
				className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800"
				animate={{
					x: ["calc(-100%)", "calc(100%)"],
				}}
				transition={{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>
		</div>
	);
};

export default LpSkeleton;
