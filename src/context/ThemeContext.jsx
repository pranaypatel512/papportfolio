import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set default theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme') || 'dark'
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', savedTheme)
    // Sync with HeroUI/Tailwind dark mode (uses class-based)
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply theme to root element for CSS variables
      document.documentElement.setAttribute('data-theme', theme)
      
      // Sync with HeroUI/Tailwind dark mode (uses class-based)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

