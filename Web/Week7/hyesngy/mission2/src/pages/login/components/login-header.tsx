import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LoginHeader = () => {
	const navigate = useNavigate();

	return (
		<header className="flex flex-row items-center w-full relative">
			<button
				type="button"
				className="cursor-pointer absolute left-0"
				onClick={() => navigate(-1)}
			>
				<IoIosArrowBack size={30} />
			</button>
			<h1 className="text-2xl font-bold text-center w-full">로그인</h1>
		</header>
	);
};

export default LoginHeader;
