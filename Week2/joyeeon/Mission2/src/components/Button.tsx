import { THEME, useTheme } from "../context/ThemeProvider"


const Button = ()  =>{
    const {theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <button
        onClick={toggleTheme}
        className={`
        px-4 py-2 rounded-lg
        ${isLightMode? 
            'bg-gray-200 text-gray-800' : 'bg-gray-900 text-gray-200'
        }
        `}
        >
            {isLightMode ? '다크모드' : '라이트모드'}
        </button>
    )
}

export default Button;