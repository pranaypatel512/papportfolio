import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

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

            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              paddingRight: '3rem',
              fontFamily: "'Inter', sans-serif"
            }}>
              {project.name}
            </h2>

            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              lineHeight: '1.7'
            }}>
              {project.description}
            </p>

            {project.metrics && (
              <div style={{
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderLeft: '2px solid var(--text-primary)',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Key Metric: {project.metrics}
                </p>
              </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                Highlights
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0
              }}>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} style={{
                    padding: '0.75rem 0',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7'
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
                    {highlight.replace(/<[^>]*>/g, '')}
                  </li>
                ))}
              </ul>
            </div>

            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ opacity: 0.7, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  border: '1px solid var(--btn-primary-bg)',
                  borderRadius: 'var(--radius-sm, 4px)'
                }}
              >
                View on Play Store
                <FaExternalLinkAlt />
              </motion.a>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal

