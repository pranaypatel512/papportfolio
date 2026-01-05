import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { FaMedium, FaExternalLinkAlt } from 'react-icons/fa'

const Blog = () => {
  const { personal } = portfolioData
  const blogUrl = personal.social.medium

  return (
    <section id="blog" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 2rem',
      background: 'var(--bg-secondary)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>Blog</h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.7'
        }}>
          I write about mobile development, leadership, and technology insights. Check out my latest articles on Medium.
        </p>

        <motion.a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.25rem 2.5rem',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            fontWeight: 500,
            fontSize: '1.125rem',
            textDecoration: 'none',
            border: '1px solid var(--text-primary)',
            transition: 'all 0.3s ease'
          }}
        >
          <FaMedium style={{ fontSize: '1.5rem' }} />
          Visit My Medium Blog
          <FaExternalLinkAlt />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Blog

