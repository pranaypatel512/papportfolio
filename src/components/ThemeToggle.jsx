import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05, opacity: 0.7 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'transparent',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        fontSize: '1rem',
        color: 'var(--text-primary)',
        padding: '0.5rem',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        borderRadius: '8px'
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
