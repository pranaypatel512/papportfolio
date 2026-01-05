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
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set default theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', 'light')
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      // Default to light theme
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Apply theme to root element
      document.documentElement.setAttribute('data-theme', theme)
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

