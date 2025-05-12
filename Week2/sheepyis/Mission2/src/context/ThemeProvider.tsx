import { createContext, PropsWithChildren, useState } from "react";

export enum THEME {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

export interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): React.ReactElement => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
    const toggleTheme = (): void => {
        setTheme((prevTheme): THEME => 
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
