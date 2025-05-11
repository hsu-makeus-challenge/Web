import { ScaleLoader } from "react-spinners";

export default function Spinner() {
	return (
		<div className="w-full h-screen flex items-center justify-center z-10">
			<ScaleLoader color="white" />
		</div>
	);
}
