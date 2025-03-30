import { useState } from "react";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContext";
import { ThemeProvider } from "./context/ThemeProvider";

export default function ContextPage(): Element {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <ThemeProvider>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Navbar />
          <main className="flex-1">
            <ThemeContent />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
