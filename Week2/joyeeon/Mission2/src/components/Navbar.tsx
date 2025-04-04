import { useState } from "react";
import { THEME, useTheme } from "../context/ThemeProvider";
import Button from "./Button";

const Navbar = () =>{
    const {theme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={`
            w-full h-12 flex items-center justify-between px-10
            shadow
            ${isLightMode?
                ' bg-gray-800' : 'bg-gray-200'
            }`}
        >
            <span
            className={`
                h-12 flex items-center
                ${isLightMode?
                    ' text-gray-200' : 'text-gray-800'
                }`}
            >내비게이션 바</span>
            <Button />
        </nav>
    )
}

export default Navbar;