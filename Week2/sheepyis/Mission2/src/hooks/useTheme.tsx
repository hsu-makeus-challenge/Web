import { useContext } from "react";
import { IThemeContext } from "../context/ThemeProvider";
import { ThemeContext } from "../context/ThemeProvider"; // ThemeContext 경로에 맞게 import

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};
