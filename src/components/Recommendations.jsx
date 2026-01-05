import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { FaLinkedin, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Recommendations = () => {
  const { recommendations } = portfolioData
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const { scrollLeft, scrollWidth, clientWidth } = container
      const hasScrollableContent = scrollWidth > clientWidth + 1 // Add 1px buffer for rounding
      
      // More lenient thresholds
      const canScrollLeftValue = hasScrollableContent && scrollLeft > 1
      const canScrollRightValue = hasScrollableContent && scrollLeft < scrollWidth - clientWidth - 1
      
      setCanScrollLeft(canScrollLeftValue)
      setCanScrollRight(canScrollRightValue)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      // Multiple checks to ensure we catch the state
      const checkMultipleTimes = () => {
        checkScrollButtons()
        setTimeout(checkScrollButtons, 50)
        setTimeout(checkScrollButtons, 200)
        setTimeout(checkScrollButtons, 500)
      }
      
      // Initial check with delays to ensure container is fully rendered
      checkMultipleTimes()
      
      // Also check on scroll with debouncing
      let scrollTimeout
      const handleScroll = () => {
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(checkScrollButtons, 50)
      }
      
      container.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', checkScrollButtons)
      
      // Use IntersectionObserver to detect when container is visible
      const observer = new IntersectionObserver(() => {
        setTimeout(checkScrollButtons, 100)
      }, { threshold: 0.1 })
      observer.observe(container)
      
      // Periodic check as fallback
      const intervalId = setInterval(checkScrollButtons, 1000)
      
      return () => {
        clearTimeout(scrollTimeout)
        clearInterval(intervalId)
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', checkScrollButtons)
        observer.disconnect()
      }
    }
  }, [recommendations])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = Math.min(320, window.innerWidth * 0.85) + 24 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      })
      // Recheck after scroll animation (smooth scroll takes ~500ms)
      setTimeout(() => {
        checkScrollButtons()
      }, 600)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = Math.min(320, window.innerWidth * 0.85) + 24 // card width + gap
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      })
      // Recheck after scroll animation (smooth scroll takes ~500ms)
      setTimeout(() => {
        checkScrollButtons()
      }, 600)
    }
  }

  return (
    <section id="recommendations" style={{
      padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
      background: 'var(--bg-secondary)'
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
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>People I've Worked With Say</h2>

        <div style={{ position: 'relative' }}>
          <style>{`
            @media (max-width: 768px) {
              .nav-button-recommendations {
                display: none !important;
              }
            }
          `}</style>
          {/* Previous Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollLeft ? 1 : 0 }}
            onClick={scrollLeft}
            whileHover={canScrollLeft ? { scale: 1.1, boxShadow: 'var(--shadow-lg)' } : {}}
            whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            className="nav-button-recommendations"
            disabled={!canScrollLeft}
            style={{
              position: 'absolute',
              left: 'clamp(-0.5rem, -2vw, -1rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 'clamp(40px, 8vw, 48px)',
              height: 'clamp(40px, 8vw, 48px)',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: canScrollLeft ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'default',
              boxShadow: 'var(--shadow-md)',
              color: 'var(--text-primary)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              transition: 'all 0.3s ease',
              pointerEvents: canScrollLeft ? 'auto' : 'none'
            }}
            aria-label="Previous recommendation"
          >
            <FaChevronLeft />
          </motion.button>

          {/* Next Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollRight ? 1 : 0 }}
            onClick={scrollRight}
            whileHover={canScrollRight ? { scale: 1.1, boxShadow: 'var(--shadow-lg)' } : {}}
            whileTap={canScrollRight ? { scale: 0.9 } : {}}
            className="nav-button-recommendations"
            disabled={!canScrollRight}
            style={{
              position: 'absolute',
              right: 'clamp(-0.5rem, -2vw, -1rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 'clamp(40px, 8vw, 48px)',
              height: 'clamp(40px, 8vw, 48px)',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: canScrollRight ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'default',
              boxShadow: 'var(--shadow-md)',
              color: 'var(--text-primary)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              transition: 'all 0.3s ease',
              pointerEvents: canScrollRight ? 'auto' : 'none'
            }}
            aria-label="Next recommendation"
          >
            <FaChevronRight />
          </motion.button>

          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: '1rem',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--border-color) transparent',
              paddingLeft: canScrollLeft ? 'clamp(1rem, 3vw, 2rem)' : '0',
              paddingRight: canScrollRight ? 'clamp(1rem, 3vw, 2rem)' : '0'
            }}
            className="recommendations-scroll"
          >
                  <style>{`
                    .recommendations-scroll::-webkit-scrollbar {
                      height: 8px;
                    }
                    .recommendations-scroll::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    .recommendations-scroll::-webkit-scrollbar-thumb {
                      background: var(--border-color);
                      border-radius: 4px;
                    }
                    .recommendations-scroll::-webkit-scrollbar-thumb:hover {
                      background: var(--text-muted);
                    }
                  `}</style>
          {recommendations.map((rec, index) => {
            const colorMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                style={{
                  minWidth: 'min(320px, 85vw)',
                  maxWidth: 'min(320px, 85vw)',
                  flexShrink: 0,
                  scrollSnapAlign: 'start'
                }}
              >
                        <div
                          className="card"
                          style={{
                            padding: '1.25rem',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius, 8px)',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--text-primary)'
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                            e.currentTarget.style.transform = 'translateY(-4px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)'
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                fontSize: '1.5rem',
                color: 'var(--text-muted)',
                opacity: 0.3
              }}>
                <FaQuoteLeft />
              </div>

              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
                paddingTop: '0.5rem',
                fontStyle: 'italic',
                fontWeight: 400
              }}>
                "{rec.text}"
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'auto'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.125rem'
                  }}>
                    {rec.name}
                  </h4>
                  {rec.position && (
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontWeight: 400
                    }}>
                      {rec.position}
                    </p>
                  )}
                  {rec.company && (
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontWeight: 400
                    }}>
                      {rec.company}
                    </p>
                  )}
                </div>
                {rec.linkedinUrl && rec.linkedinUrl !== '#' && (
                  <motion.a
                    href={rec.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, opacity: 0.7 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-primary)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                      marginLeft: '0.75rem'
                    }}
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin />
                  </motion.a>
                )}
              </div>
                </div>
              </motion.div>
            )
          })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Recommendations

