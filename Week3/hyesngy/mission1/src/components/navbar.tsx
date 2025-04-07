import { Link } from "react-router-dom";

const navbar = () => {
	return (
		<nav className="w-full h-10 px-4 flex flex-row items-center gap-4 bg-black text-white ">
			<Link to={"/"}>홈</Link>
			<Link to={"/movies"}>영화</Link>
		</nav>
	);
};

export default navbar;
