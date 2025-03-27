import { JSX } from "react";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent(): JSX.Element {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className="p-4 text-center">
      <p className="text-lg">
        현재 테마: {isLightMode ? "라이트 모드" : "다크 모드"}
      </p>
    </div>
  );
}
