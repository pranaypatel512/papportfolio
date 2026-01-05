import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

const Skills = () => {
  const { skills } = portfolioData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="skills" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 2rem',
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
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>Skills</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginTop: '2rem'
        }}>
          {/* Technical Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}>
              Technical
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {skills.technical.map((skill, index) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ opacity: 0.7, y: -2 }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    cursor: 'default',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Leadership Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '2rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Leadership
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {skills.leadership.map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ x: 8, opacity: 0.8 }}
                  style={{
                    padding: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                    fontWeight: 400
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
