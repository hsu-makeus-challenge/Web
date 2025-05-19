import {NavLink} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const AUTH_LINKS = [
    {to: '/signup', label: '가입하기'},
    {to: '/login', label: '로그인하기'},
];

const NavbarAuth = () => {
    const {accessToken} = useAuth();

    if (accessToken) return null;

    return (
        <>
            {AUTH_LINKS.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={
                        link.to === '/login'
                            ? 'bg-white text-black text-base font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition'
                            : 'text-white hover:text-green-500 text-base font-medium transition'
                    }
                >
                    {link.label}
                </NavLink>
            ))}
        </>
    );
};

export default NavbarAuth;