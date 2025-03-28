import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

const DarkModeContext = createContext<{
  isDark: boolean
  toggleDark: () => void
} | null>(null)

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false)

  const toggleDark = () => setIsDark(prev => !prev)

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('custom-dark')
      document.body.classList.remove('custom-light')
    } else {
      document.body.classList.add('custom-light')
      document.body.classList.remove('custom-dark')
    }
  }, [isDark])

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('DarkModeProvider 안에서만 써야 함')
  return ctx
}
