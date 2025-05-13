import { FaPen, FaTrashAlt, FaUserCircle } from "react-icons/fa";

export interface LpHeaderProps {
	title: string;
	authorName?: string;
	authorAvatar?: string;
	createdAt: string;
}

const LpHeader = ({
	title,
	authorName,
	authorAvatar,
	createdAt,
}: LpHeaderProps) => {
	return (
		<>
			<div className="w-full flex flex-row justify-between">
				<div className="flex flex-row gap-3 items-center">
					{authorAvatar ? (
						<img
							src={authorAvatar}
							alt={authorName}
							className="w-7 h-7 rounded-full"
						/>
					) : (
						<FaUserCircle size={30} />
					)}

					<p>{authorName}</p>
				</div>
				<p>{createdAt.split("T")[0].replace(/-/g, ".")}</p>
			</div>

			<div className="w-full flex flex-row justify-between">
				<p>{title}</p>
				<div className="flex flex-row gap-5 items-center">
					<FaPen className="cursor-pointer" />
					<FaTrashAlt className="cursor-pointer" />
				</div>
			</div>
		</>
	);
};

export default LpHeader;
