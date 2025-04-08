import { THEME, useTheme } from "../context/ThemeProvider"


const Contents = ()  =>{
    const {theme, toggleTheme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <section
        onClick={toggleTheme}
        className={`
        px-30 py-50 rounded-lg
        ${isLightMode? 
            'bg-gray-200 text-gray-800' : 'bg-gray-900 text-gray-200'
        }
        `}
        >
        </section>
    )
}

export default Contents;