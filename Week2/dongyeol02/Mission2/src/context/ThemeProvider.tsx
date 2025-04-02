import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

type TTHeme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTHeme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): Element => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = (): void => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): void => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("usetheme must be used within a ThemeProvider");
  }

  return context;
};
