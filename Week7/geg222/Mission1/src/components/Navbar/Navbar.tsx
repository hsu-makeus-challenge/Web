import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavbarLinks from "./NavbarLinks";
import NavbarAuth from "./NavbarAuth";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const location = useLocation();
  const { accessToken } = useAuth();
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-16 py-6 bg-black h-24">
      <div className="flex items-center gap-4">
        <img src="/public/spotify_icon.png" alt="Logo" className="w-10 h-10" />
      </div>

      <div className="flex items-center gap-6">
        <NavbarLinks />
        <div className="w-px h-6 bg-gray-600"></div>
        {!accessToken ? <NavbarAuth /> : <NavbarDropdown />}
      </div>
    </div>
  );
};

export default Navbar;
