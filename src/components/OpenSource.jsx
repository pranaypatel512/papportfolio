import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'

const OpenSource = () => {
  const { openSource, personal } = portfolioData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="opensource" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
      background: 'var(--bg-primary)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>Open Source</h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
              width: '100%'
            }}
        >
          {openSource.slice(0, 3).map((project, index) => {
            const colorMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
            return (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ y: -4 }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  className="card"
                  style={{
                    padding: '1.5rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius, 8px)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm, 4px)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '1.5rem'
                    }}>
                      <FaGithub />
                    </div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                      margin: 0,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      {project.name}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6',
                    flex: 1
                  }}>
                    {project.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm, 4px)',
                      fontSize: '0.8rem',
                      fontWeight: 400,
                      color: 'var(--text-primary)'
                    }}>
                      {project.language}
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      marginLeft: 'auto'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <FaStar />
                        <span>{project.stars}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <FaCodeBranch />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}
        >
          <motion.a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ opacity: 0.7, y: -2 }}
            style={{
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'underline',
              textUnderlineOffset: '4px'
            }}
          >
            More Projects on GitHub →
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default OpenSource

