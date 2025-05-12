import { createContext, PropsWithChildren, useContext, useState } from 'react';

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): React.ReactElement => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = (): void => {
        setTheme((prevTheme) :THEME =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
        console.log(theme);
    };

    return (
        <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = ()=> {
    const content = useContext(ThemeContext);

    if(!content) {
        throw new Error ("useTheme must be used ");
    }

    return content;
}

export default ThemeContext;
