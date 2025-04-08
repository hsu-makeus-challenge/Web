import CreditItem from "./credit-item";
import type { Member, Movie } from "@typedefs/movie";

const CreditList = ({ movie }: { movie: Movie }) => {
	return (
		<div className="p-5 flex flex-col gap-5">
			<h1 className="text-2xl font-semibold my-10">감독/출연</h1>
			<div className="flex flex-wrap gap-10 px-10">
				{movie.credits?.cast.map((member: Member) => (
					<CreditItem key={member.id} member={member} />
				))}
			</div>
		</div>
	);
};

export default CreditList;
