import React from 'react'
import { motion } from 'framer-motion'
import Toolkit from './Toolkit'
import Talks from './Talks'

const ToolkitAndTalks = () => {
  return (
    <section id="toolkit-talks" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
      background: 'var(--bg-primary)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'flex-start'
        }}>
          {/* Toolkit Column */}
          <div>
            <Toolkit />
          </div>

          {/* Talks Column */}
          <div>
            <Talks />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ToolkitAndTalks

