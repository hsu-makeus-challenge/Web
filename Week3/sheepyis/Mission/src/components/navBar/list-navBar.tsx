import { useLocation } from "react-router-dom";
import ItemNavBar from "./item-navBar";
import NavBarData from "../../utils/navBarData";

const ListNavBar = () => {
  const location = useLocation();

  return (
    <nav className="w-full h-[3vw] flex items-center px-[2vw] gap-[2vw]">
      {NavBarData.map((item) => (
        <ItemNavBar
          key={item.id}
          name={item.name}
          path={item.path}
          isActive={location.pathname === item.path}
        />
      ))}
    </nav>
  );
};

export default ListNavBar;
