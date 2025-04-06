import { THEME, useTheme } from "../context/ThemeProvider";
import Contents from "./Contents";

const BodyComp= () =>{
    const {theme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <main className={`
            w-full h-screen flex items-center justify-center gap-20 px-10
            shadow
            ${isLightMode?
                ' bg-gray-600' : 'bg-cyan-50'
            }`}
        >        
            <Contents /> <Contents />
        </main>
    )
}

export default BodyComp;