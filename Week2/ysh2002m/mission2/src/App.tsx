import DarkModeToggle from './components/DarkModeToggle'
import { DarkModeProvider } from './context/DarkModeContext'

function App() {
  return (
    <DarkModeProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <DarkModeToggle />
        </div>
    </DarkModeProvider>
  )
}

export default App
