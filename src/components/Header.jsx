import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AvailableBadge from './AvailableBadge'
import { portfolioData } from '../data/portfolioData'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '1.25rem 2rem'
      }}
      className="header"
    >
      <nav style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <motion.div
            whileHover={{ opacity: 0.8 }}
            style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              fontFamily: "'Inter', sans-serif"
            }}
            onClick={() => scrollToSection('#hero')}
          >
            {portfolioData.personal.name}
          </motion.div>
          <AvailableBadge />
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
