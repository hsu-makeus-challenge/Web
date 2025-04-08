import { useTheme, THEME } from '../context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';
import clsx from 'clsx';

export default function Navbar() {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav
            className={clsx(
                'p-4 w-full flex justify-end sticky top-0 z-10 shadow-md',
                isLightMode ? 'bg-white' : 'bg-gray-800'
            )}
        >
            <ThemeToggleButton />
        </nav>
    )
}