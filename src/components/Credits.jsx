import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

const Credits = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{
        padding: '2rem 1.5rem',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '0.5rem'
        }}>
          Design system powered by
        </p>
        <motion.a
          href="https://github.com/CRED-CLUB/neopop-web"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ opacity: 0.7, y: -2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          <FaGithub />
          <span>NeoPOP by CRED</span>
        </motion.a>
      </div>
    </motion.footer>
  )
}

export default Credits

