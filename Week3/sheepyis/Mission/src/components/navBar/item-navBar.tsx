import { Link } from "react-router-dom";

interface ItemProps {
  name: string;
  path: string;
  isActive: boolean;
}

const ItemNavBar = ({ name, path, isActive }: ItemProps) => {
    return (
        <Link to={path}>
            <p
                className={`text-[1vw] transition-colors duration-200 ${
                    isActive ? "text-green-300 font-bold" : "text-black"
                } hover:text-green-300 hover:font-bold`}
            >
                {name}
            </p>
        </Link>
    );
};

export default ItemNavBar;
