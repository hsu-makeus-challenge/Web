import type { Lp } from "@typedefs/lp";
import { useNavigate } from "react-router-dom";
import LpSkeleton from "./lp-skeleton";
import { useState } from "react";

interface LpItemProps {
	lp: Lp;
}

const LpItem = ({ lp }: LpItemProps) => {
	const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

	return (
		<button
			type="button"
			onClick={() => {
				navigate(`/lp/${lp.id}`);
			}}
			className="relative w-45 h-45 group bg-gray-400 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
		>
      {!imageLoaded && (
        <div className="absolute inset-0 w-full h-full">
          <LpSkeleton />
        </div>
      )}
			
			<img
				src={lp.thumbnail}
				alt={lp.title}
				className="w-full h-full object-cover"
				onLoad={handleImageLoad}
			/>

			<div className="absolute inset-0 opacity-0 p-5 group-hover:opacity-100 bg-black/60 flex flex-col justify-end">
				<p className="text-start text-sm">{lp.title}</p>
				<div className="flex justify-between items-center mt-2">
					<p className="text-sm">
						{lp.updatedAt.split("T")[0].replace(/-/g, ".")}
					</p>

					<p className="text-sm">
						<span>♥️</span>
						{lp.likes.length}
					</p>
				</div>
			</div>
		</button>
	);
};

export default LpItem;
