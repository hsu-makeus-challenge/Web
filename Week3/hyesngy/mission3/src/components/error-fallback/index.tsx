import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ErrorFallback = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full h-screen flex items-center justify-center z-10 text-red-700 text-xl flex-col gap-2">
			<MdError size={80} />
			<p>에러가 발생했습니다.</p>
			<button
				type="button"
				onClick={() => navigate("/")}
				className="mt-4 px-6 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 cursor-pointer transition-colors"
			>
				홈으로 돌아가기
			</button>
		</div>
	);
};

export default ErrorFallback;
