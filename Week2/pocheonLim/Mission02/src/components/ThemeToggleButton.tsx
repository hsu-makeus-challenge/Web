import { useTheme, THEME } from '../context/ThemeProvider';
import clsx from 'clsx';

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    
    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                'p-2 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2',
                isLightMode 
                    ? 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400' 
                    : 'bg-gray-700 text-black hover:bg-gray-600 focus:ring-gray-500'
            )}
        >
            {isLightMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
    );
}
