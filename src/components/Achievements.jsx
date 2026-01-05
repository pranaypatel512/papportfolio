import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

const Achievements = () => {
  const { achievements, certifications, education } = portfolioData

  return (
    <section id="achievements" style={{
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
        <h2 className="section-title" style={{ marginBottom: '4rem' }}>Achievements</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card"
              style={{
                padding: '2rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)'
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '0.75rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}>
                {achievement.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
                lineHeight: '1.6'
              }}>
                {achievement.description}
              </p>
              {achievement.link && (
                <motion.a
                  href={achievement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ opacity: 0.7 }}
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px'
                  }}
                >
                  View Profile →
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Achievements
