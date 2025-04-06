import Navbar from './Navbar';
import ThemeContent from './ThemeContent';
import { ThemeProvider } from './context/ThemeProvider';

export default function ContextPage(): React.ReactElement  {
  return (
    <ThemeProvider>
      <Navbar />
      <ThemeContent />
    </ThemeProvider>
  );
}