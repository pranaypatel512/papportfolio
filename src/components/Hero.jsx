import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'
import AvailableBadge from './AvailableBadge'

const Hero = () => {
  const { personal, experience } = portfolioData
  // Get all current positions
  const currentPositions = experience.filter(exp => exp.isCurrent)
  // Combine companies for display
  const companies = currentPositions.map(exp => exp.company).join('/')
  const position = currentPositions[0]?.position || personal.title


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" style={{
      padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem)',
      background: 'var(--bg-primary)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      minHeight: 'auto'
    }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: '1.5rem'
          }}
        >
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            fontWeight: 400,
            fontFamily: "'Inter', sans-serif"
          }}>
            {personal.location}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1rem'
          }}>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 500,
              margin: 0,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              {personal.name}
            </h1>
            <AvailableBadge />
          </div>
          
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <FaBriefcase style={{ fontSize: '1rem', opacity: 0.7 }} />
            <span>
              {currentPositions.length > 0 
                ? `${position} - Mobile · ${companies}`
                : `${personal.title} - Mobile`
              }
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ opacity: 0.9, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
              style={{
                padding: '0.875rem 1.75rem',
                fontSize: '0.9rem',
                fontWeight: 400,
                borderRadius: 'var(--radius-sm, 4px)',
                cursor: 'pointer'
              }}
            >
              Get in Touch
            </motion.button>
            <motion.a
              href={personal.resume}
              download="PRANAY_PATEL_CV_2026.pdf"
              whileHover={{ opacity: 0.8, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-secondary"
              style={{
                padding: '0.875rem 1.75rem',
                fontSize: '0.9rem',
                fontWeight: 400,
                borderRadius: 'var(--radius-sm, 4px)',
                border: '1px solid var(--btn-secondary-border)',
                color: 'var(--btn-secondary-text)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                background: 'var(--btn-secondary-bg)'
              }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
