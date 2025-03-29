import { createContext, PropsWithChildren, useState, useContext } from 'react';

enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface DarkModeContextProps {
  theme: TTheme;
  changeTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const changeTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <DarkModeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error('tlqkf');
  }

  return context;
};

export { DarkModeProvider, useTheme, THEME };
