import { motion } from "motion/react";

export interface LpCoverProps {
	thumbnail?: string;
	title: string;
}

const LpCover = ({ thumbnail, title }: LpCoverProps) => {
	return (
		<div className="w-96 h-96 flex items-center justify-center shadow-2xl shadow-black/80">
			<motion.div
				className="w-80 h-80 relative"
				animate={{ rotate: 360 }}
				transition={{
					repeat: Number.POSITIVE_INFINITY,
					duration: 6,
					ease: "linear",
					repeatType: "loop",
				}}
			>
				{thumbnail ? (
					<img
						src={thumbnail}
						alt={title}
						className="w-80 h-80 object-cover rounded-full border border-white"
					/>
				) : (
					<div className="w-80 h-80 rounded-full bg-gray-500 border border-white" />
				)}

				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 rounded-full bg-gray-100 border-black border" />
			</motion.div>
		</div>
	);
};

export default LpCover;
