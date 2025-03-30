import { useTheme, THEME } from "./ThemeProvider";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className="font-bold px-4 py-2 bg-transparent border-0 rounded m-4"
    >
      {isLight ? "🌙 다크 모드" : "🌞 라이트 모드"}
    </button>
  );
}
