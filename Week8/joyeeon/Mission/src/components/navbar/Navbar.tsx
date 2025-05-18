import { useNavigate , useParams} from "react-router-dom";
import { MouseEvent } from "react";
import NavSign from "./NavSigns";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import SignOutBtn from "./SignoutBtn";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from "../../context/SidebarContext";
import { useMediaQuery } from "react-responsive";

interface NavItem {
    label: string;
    path: string;
    category: string | undefined;
}

const Navbar = () =>{
    const {accessToken} = useAuth();
    const {category} = useParams(); 
    //console.log(`params 값: ${category}`);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const {toggleSidebar} = useSidebar();

    const navItems: NavItem[] = [
        { label: '홈', path: '/', category: undefined },
        { label: '인기 영화', path: '/movies/popular', category: 'popular' },
        { label: '상영 중', path: '/movies/now_playing', category: 'now_playing' },
        { label: '평점 높은', path: '/movies/top_rated', category: 'top_rated' },
        { label: '개봉 예정', path: '/movies/upcoming', category: 'upcoming' },
    ];

    const handleNavigate = (path:string) => (e:MouseEvent<HTMLLIElement>) => {
        navigate(path);
    };


    return (
        <nav className="flex items-center justify-between bg-blue-100 min-h-10 h-10 top-0 pl-5 pr-5 px-5">
            {/* <ul className="flex gap-4 ">
            {navItems.map(({ label, path, category: cat }) => (
                    <li
                        key={path}
                        onClick={handleNavigate(path)}
                        className={`cursor-pointer ${
                            category === cat ? 'font-bold underline text-blue-700' : ''
                        }`}
                    >
                        {label}
                    </li>
                ))}
            </ul> */}
            <div className="flex flex-row gap-2 font-bold items-center text-amber-700">
                <GiHamburgerMenu className="text-[20px] cursor-pointer"
                onClick={() => isMobile && toggleSidebar()}/>
                JOY-LP판</div>
            <div className="flex flex-row items-center gap-5">
            <FaSearch />
            {accessToken ?<SignOutBtn />: <NavSign/>}
            </div> 
        </nav>
    )
}

export default Navbar;