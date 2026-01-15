import React from 'react'
import { Button } from '@heroui/react'
import { useTheme } from '../hooks/useTheme'
import { FaSun, FaMoon } from 'react-icons/fa'
import { motion } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="min-w-10 w-10 h-10"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </motion.div>
    </Button>
  )
}

export default ThemeToggle
