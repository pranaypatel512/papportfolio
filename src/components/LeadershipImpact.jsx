import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

const LeadershipImpact = () => {
  const { leadershipMetrics } = portfolioData

  const metrics = [
    {
      label: 'Mentoring Experience',
      value: `${leadershipMetrics.mentoringYears} years`,
      description: 'Mentoring junior engineers across multiple companies'
    },
    {
      label: 'Projects Led',
      value: `${leadershipMetrics.projectsLed}+`,
      description: 'As Project Lead/Team Lead'
    },
    {
      label: 'Code Quality',
      value: `${leadershipMetrics.codeQuality}`,
      description: 'Maintained through code reviews'
    },
    {
      label: 'Workflow Optimization',
      value: `${leadershipMetrics.workflowOptimization}`,
      description: 'CI/CD setup efficiency improvement'
    }
  ]

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
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="leadership" style={{
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
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Leadership Impact</h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-secondary)',
          marginBottom: '4rem',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '700px',
          margin: '0 auto 4rem'
        }}>
          Quantified impact of leadership, mentoring, and team management
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              whileHover={{ y: -4, opacity: 0.9 }}
              className="card"
              style={{
                padding: '2rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                textAlign: 'center'
              }}
            >
              <h3 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 600,
                background: 'var(--text-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em'
              }}>
                {metric.value}
              </h3>
              <h4 style={{
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {metric.label}
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LeadershipImpact
