import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { FaExternalLinkAlt, FaMicrophone } from 'react-icons/fa'

const Talks = () => {
  const { talks } = portfolioData

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <h2 className="section-title" style={{ marginBottom: '1rem' }}>Talks</h2>
      <p style={{
        fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        fontWeight: 400,
        lineHeight: '1.6'
      }}>
        I love to share my knowledge and get a speaker badge 😅
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {talks.map((talk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              padding: '1.25rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius, 8px)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm, 4px)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                flexShrink: 0
              }}>
                <FaMicrophone />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: '1.3'
                }}>
                  {talk.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}>
                  {talk.description}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {talk.slidesUrl && (
                    <motion.a
                      href={talk.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ opacity: 0.7, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm, 4px)',
                        background: 'var(--bg-secondary)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Slides
                      <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
                    </motion.a>
                  )}
                  {talk.eventUrl && (
                    <motion.a
                      href={talk.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ opacity: 0.7, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.375rem 0.75rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm, 4px)',
                        background: 'var(--bg-secondary)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Event
                      <FaExternalLinkAlt style={{ fontSize: '0.75rem' }} />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Talks


