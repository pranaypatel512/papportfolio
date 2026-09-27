import React, { useRef, Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'

// Stats data
const stats = [
  { value: 11, suffix: '+', label: 'Years Experience', color: '#818cf8' },
  { value: 25, suffix: 'k+', label: 'StackOverflow Reputation', color: '#a78bfa' },
  { value: 4, suffix: '+', label: 'Projects Led', color: '#6366f1' },
  { value: 9, suffix: '+', label: 'Years Mentoring', color: '#c4b5fd' },
]

/**
 * Animated counter that counts up when in view.
 */
function AnimatedCounter({ value, suffix, color }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1600
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * value)
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          color,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textShadow: `0 0 20px ${color}55`,
        }}
      >
        {display}
        <span style={{ fontSize: '0.6em', opacity: 0.8 }}>{suffix}</span>
      </div>
    </div>
  )
}

/**
 * Rotating wireframe icosahedron in the 3D canvas.
 */
function IcosahedronShape() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.25
    groupRef.current.rotation.x += delta * 0.1
    groupRef.current.rotation.z += delta * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Solid inner */}
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#1a1a3a"
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Wireframe outer */}
      <mesh>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Glow */}
      <pointLight color="#818cf8" intensity={2} distance={5} decay={2} />
    </group>
  )
}

/**
 * About3DStats Section — animated stat counters + 3D icosahedron.
 */
const About3DStats = () => {
  return (
    <section
      id="about-stats"
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        background: 'transparent',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        <h2 className="section-title" style={{ marginBottom: '3rem' }}>
          By the Numbers
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left — stats grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: 'var(--card-bg-glass, rgba(10,10,20,0.6))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${stat.color}33`,
                  borderRadius: 'var(--radius, 8px)',
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'border-color 0.3s ease',
                }}
                whileHover={{ scale: 1.03 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — 3D icosahedron */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              height: '320px',
              borderRadius: 'var(--radius, 8px)',
              overflow: 'hidden',
              background: 'rgba(5, 5, 20, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 3], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} color="#8888ff" />
              <Suspense fallback={null}>
                <IcosahedronShape />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        {/* Summary tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            background: 'var(--card-bg-glass, rgba(10,10,20,0.6))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius, 8px)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Experienced Software Architect &amp; Lead Engineer specializing in
            mobile development, AI tools, and building scalable products —
            with a passion for mentoring and open source.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About3DStats
