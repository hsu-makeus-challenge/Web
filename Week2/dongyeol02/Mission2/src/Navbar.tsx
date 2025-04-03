import { useContext } from "react";
import { ThemeContext, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./context/ThemeToggleButton";

export default function Navbar(): Element {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav
      className={clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
