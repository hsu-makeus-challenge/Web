import LpItem from "./lp-item";
import type { Lp } from "@typedefs/lp";

interface LpListProps {
	lps?: Lp[];
}

const LpList = ({ lps = [] }: LpListProps) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
			{lps.map((lp) => (
				<LpItem key={lp.id} lp={lp} />
			))}
		</div>
	);
};

export default LpList;
