import React from 'react'
import { Chip } from '@heroui/react'
import { motion } from 'framer-motion'

const AvailableBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Chip
        variant="flat"
        color="success"
        className="relative overflow-hidden"
        startContent={
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0 relative z-10"
          />
        }
      >
        <span className="relative z-10">Available for work</span>
      </Chip>
      {/* Ripple effect background */}
      <motion.div
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.4, 0, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut'
        }}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-success z-0 pointer-events-none"
      />
    </motion.div>
  )
}

export default AvailableBadge

