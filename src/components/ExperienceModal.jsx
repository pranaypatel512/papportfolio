import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'

const ExperienceModal = ({ experience, isOpen, onClose }) => {
  if (!experience) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 1000,
              backdropFilter: 'blur(4px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius, 8px)',
              boxShadow: 'var(--shadow-lg)',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              zIndex: 1001,
              padding: '3rem',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingRight: '3rem'
            }}>
              <div style={{
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm, 4px)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}>
                <FaBriefcase />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {experience.position}
                </h2>
                <h3 style={{
                  fontSize: '1.25rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                  fontWeight: 500
                }}>
                  {experience.company}
                </h3>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              fontSize: '0.95rem',
              color: 'var(--text-muted)'
            }}>
              <span>{experience.startDate} - {experience.endDate}</span>
              <span>•</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <FaMapMarkerAlt />
                <span>{experience.location}</span>
              </div>
              {experience.isCurrent && (
                <>
                  <span>•</span>
                  <span className="leadership-badge">Current</span>
                </>
              )}
              {experience.isLeadership && !experience.isCurrent && (
                <>
                  <span>•</span>
                  <span className="leadership-badge">Leadership</span>
                </>
              )}
            </div>

            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                Key Achievements
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} style={{
                    padding: '0.75rem 0',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    fontSize: '1rem'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '1rem',
                      width: '5px',
                      height: '5px',
                      background: 'var(--text-primary)',
                      borderRadius: '50%'
                    }} />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ExperienceModal

