import type { Member } from "@typedefs/movie";
import { IoPerson } from "react-icons/io5";

const CreditItem = ({ member }: { member: Member }) => {
	const { name, profile_path, known_for_department } = member;

	return (
		<div className="w-30 flex flex-col shrink-0 text-center">
			{profile_path ? (
				<img
					src={`https://image.tmdb.org/t/p/w185${profile_path}`}
					alt={name}
					className="w-30 h-30 rounded-full object-cover"
				/>
			) : (
				<div className="w-30 h-30 rounded-full bg-gray-400 flex items-center justify-center">
					<IoPerson size={60} />
				</div>
			)}

			<p className="whitespace-normal">{name}</p>
			<p className="text-gray-400">{known_for_department}</p>
		</div>
	);
};

export default CreditItem;
