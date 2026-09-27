import React, { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import * as THREE from 'three'

const skills = portfolioData.skills.technical

/**
 * Positions N skill labels evenly on a sphere surface using the Fibonacci sphere algorithm.
 */
function fibonacciSpherePoints(count, radius) {
  const points = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count)
    const phi = (2 * Math.PI * i) / goldenRatio
    points.push([
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta),
    ])
  }
  return points
}

/**
 * A single skill label rendered as a sprite-like plane with canvas texture.
 */
function SkillLabel({ position, label, index }) {
  const meshRef = useRef()

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    // Pill background
    const colors = ['#818cf8', '#a78bfa', '#6366f1', '#c4b5fd', '#7c3aed']
    const bg = colors[index % colors.length]

    ctx.fillStyle = bg + '33'
    ctx.strokeStyle = bg
    ctx.lineWidth = 2
    const r = 20
    ctx.beginPath()
    ctx.moveTo(r, 0)
    ctx.lineTo(256 - r, 0)
    ctx.quadraticCurveTo(256, 0, 256, r)
    ctx.lineTo(256, 64 - r)
    ctx.quadraticCurveTo(256, 64, 256 - r, 64)
    ctx.lineTo(r, 64)
    ctx.quadraticCurveTo(0, 64, 0, 64 - r)
    ctx.lineTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Text
    ctx.fillStyle = bg
    ctx.font = 'bold 22px "Inter", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, 128, 32)

    return new THREE.CanvasTexture(canvas)
  }, [label, index])

  useFrame((state) => {
    if (!meshRef.current) return
    // Always face camera (billboard)
    meshRef.current.quaternion.copy(state.camera.quaternion)
    // Subtle float
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.06
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.85, 0.22]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * The rotating sphere skeleton + skill labels.
 */
function SkillSphere() {
  const groupRef = useRef()
  const points = useMemo(() => fibonacciSpherePoints(skills.length, 1.4), [])

  // Wireframe sphere
  const sphereGeo = useMemo(() => new THREE.IcosahedronGeometry(1.4, 2), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.18
    groupRef.current.rotation.x += delta * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh geometry={sphereGeo}>
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Skill labels */}
      {skills.map((skill, i) => (
        <SkillLabel
          key={skill}
          position={points[i]}
          label={skill}
          index={i}
        />
      ))}

      {/* Center glow */}
      <pointLight color="#818cf8" intensity={1.5} distance={4} decay={2} />
    </group>
  )
}

/**
 * Skills3D Section — full section with embedded R3F canvas.
 */
const Skills3D = () => {
  return (
    <section
      id="skills"
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
          Skills
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left — bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: 'var(--card-bg-glass, rgba(10,10,20,0.6))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 'var(--radius, 8px)',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Technical Arsenal
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
              }}
            >
              11+ years of hands-on expertise across mobile, backend, and
              DevOps — with a strong focus on Android, Kotlin, and
              cross-platform development.
            </p>

            {/* Skill pills list */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(99, 102, 241, 0.35)',
                    color: '#818cf8',
                    fontSize: '0.8rem',
                    fontFamily: "'Inter', sans-serif",
                    background: 'rgba(99, 102, 241, 0.08)',
                    cursor: 'default',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Leadership skills */}
            <div style={{ marginTop: '1.5rem' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Leadership
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {portfolioData.skills.leadership.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(167, 139, 250, 0.25)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontFamily: "'Inter', sans-serif",
                      background: 'rgba(167, 139, 250, 0.05)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 3D sphere canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              height: '400px',
              borderRadius: 'var(--radius, 8px)',
              overflow: 'hidden',
              background: 'rgba(5, 5, 20, 0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 3.5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.3} color="#8888ff" />
              <Suspense fallback={null}>
                <SkillSphere />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Skills3D
