import { useNavigate , useParams} from "react-router-dom";
import { MouseEvent } from "react";

interface NavItem {
    label: string;
    path: string;
    category: string | undefined;
}

const Navbar = () =>{
    const {category} = useParams(); 
    //console.log(`params 값: ${category}`);
    const navigate = useNavigate();

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
        <nav className="flex items-center bg-blue-100 h-10 top-0 pl-5">
            <ul className="flex gap-4 ">
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
            </ul>
        </nav>
    )
}

export default Navbar;