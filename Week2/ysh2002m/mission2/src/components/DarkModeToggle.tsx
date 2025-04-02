import { useDarkMode } from '../context/DarkModeContext'

const DarkModeToggle = () => {
    const { isDark, toggleDark } = useDarkMode()
  
    return (
      <button
        onClick={toggleDark}
        className="absolute w-35 px-6 py-3 rounded-lg text-white bg-black dark:bg-white dark:text-black transition"
      >
        {isDark ? '화이트 모드' : '다크 모드'}
      </button>
    )
}

export default DarkModeToggle
