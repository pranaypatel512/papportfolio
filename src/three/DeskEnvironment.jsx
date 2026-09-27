import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Procedural developer desk scene visible in the hero viewport.
 * All geometry is built with Three.js primitives — no external models needed.
 */
export default function DeskEnvironment() {
  const monitorGlowRef = useRef()
  const steamRef = useRef()
  const panel1Ref = useRef()
  const panel2Ref = useRef()
  const panel3Ref = useRef()

  // Steam particle positions
  const steamPositions = useMemo(() => {
    const count = 30
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.15
      positions[i * 3 + 1] = Math.random() * 0.6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15
    }
    return positions
  }, [])

  // Code texture for monitor screen
  const codeTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 384
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#0d1117'
    ctx.fillRect(0, 0, 512, 384)

    // Simulate code lines
    const lines = [
      { x: 20, text: 'class Portfolio {', color: '#ff7b72' },
      { x: 40, text: 'skills = ["Android", "Kotlin",', color: '#79c0ff' },
      { x: 60, text: '  "Flutter", "KMP"]', color: '#79c0ff' },
      { x: 40, text: 'experience = 11 // years', color: '#a5d6ff' },
      { x: 20, text: '', color: '' },
      { x: 20, text: '  build() {', color: '#ff7b72' },
      { x: 40, text: 'return /* 🚀 awesome */', color: '#8b949e' },
      { x: 20, text: '  }', color: '#ff7b72' },
      { x: 20, text: '}', color: '#e6edf3' },
      { x: 20, text: '', color: '' },
      { x: 20, text: 'const me = new Portfolio()', color: '#e6edf3' },
      { x: 20, text: 'me.build() // ✨', color: '#e6edf3' },
    ]

    ctx.font = '16px "Courier New", monospace'
    lines.forEach((line, i) => {
      if (line.text) {
        ctx.fillStyle = line.color
        ctx.fillText(line.text, line.x, 30 + i * 28)
      }
    })

    // Scan line effect
    for (let y = 0; y < 384; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, y, 512, 2)
    }

    // Cursor blink simulation
    ctx.fillStyle = '#818cf8'
    ctx.fillRect(20, 340, 10, 18)

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Monitor glow pulse
    if (monitorGlowRef.current) {
      monitorGlowRef.current.intensity = 1.2 + Math.sin(t * 0.8) * 0.3
    }

    // Floating panels drift
    if (panel1Ref.current) {
      panel1Ref.current.position.y = 2.2 + Math.sin(t * 0.5) * 0.12
      panel1Ref.current.rotation.y = Math.sin(t * 0.3) * 0.08 + 0.3
    }
    if (panel2Ref.current) {
      panel2Ref.current.position.y = 1.8 + Math.sin(t * 0.4 + 1) * 0.1
      panel2Ref.current.rotation.y = Math.sin(t * 0.25 + 2) * 0.06 - 0.25
    }
    if (panel3Ref.current) {
      panel3Ref.current.position.y = 2.5 + Math.sin(t * 0.6 + 2) * 0.15
      panel3Ref.current.rotation.z = Math.sin(t * 0.2) * 0.04
    }

    // Steam particles drift upward
    if (steamRef.current) {
      steamRef.current.position.y = (t * 0.08) % 0.5
      steamRef.current.material.opacity = 0.4 - ((t * 0.08) % 0.5) * 0.6
    }
  })

  return (
    <group position={[0, -1.5, 0]}>
      {/* === DESK SURFACE === */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[5, 0.08, 2.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Desk edge trim — subtle glowing edge */}
      <mesh position={[0, 0.01, 1.25]}>
        <boxGeometry args={[5, 0.02, 0.04]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
      </mesh>

      {/* Desk legs */}
      {[[-2.2, -0.9, -0.9], [2.2, -0.9, -0.9], [-2.2, -0.9, 0.9], [2.2, -0.9, 0.9]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 1.8, 0.08]} />
          <meshStandardMaterial color="#111122" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}

      {/* === MONITOR STAND === */}
      <mesh position={[0, 0.25, -0.4]}>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.07, -0.4]}>
        <boxGeometry args={[0.5, 0.05, 0.35]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* === MONITOR BODY === */}
      <mesh position={[0, 1.15, -0.45]}>
        <boxGeometry args={[2.2, 1.3, 0.08]} />
        <meshStandardMaterial color="#0a0a14" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Monitor bezel */}
      <mesh position={[0, 1.15, -0.41]}>
        <boxGeometry args={[2.1, 1.2, 0.02]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Monitor SCREEN with code texture */}
      <mesh position={[0, 1.15, -0.39]}>
        <planeGeometry args={[1.95, 1.1]} />
        <meshStandardMaterial
          map={codeTexture}
          emissive="#1a237e"
          emissiveIntensity={0.15}
          roughness={0.0}
          metalness={0.0}
        />
      </mesh>

      {/* Monitor screen glow light */}
      <pointLight
        ref={monitorGlowRef}
        position={[0, 1.15, 0]}
        color="#818cf8"
        intensity={1.5}
        distance={4}
        decay={2}
      />

      {/* === KEYBOARD === */}
      <mesh position={[0, 0.055, 0.55]}>
        <boxGeometry args={[1.4, 0.04, 0.45]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Keyboard key rows (decorative) */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -0.6 + col * 0.11,
              0.08,
              0.38 + row * 0.085
            ]}
          >
            <boxGeometry args={[0.09, 0.02, 0.075]} />
            <meshStandardMaterial
              color={Math.random() > 0.97 ? '#818cf8' : '#1a1a2e'}
              roughness={0.6}
              emissive={Math.random() > 0.97 ? '#818cf8' : '#000000'}
              emissiveIntensity={0.5}
            />
          </mesh>
        ))
      )}

      {/* === COFFEE MUG === */}
      <group position={[1.6, 0.15, 0.3]}>
        {/* Mug body */}
        <mesh>
          <cylinderGeometry args={[0.12, 0.1, 0.25, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Coffee liquid */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.02, 16]} />
          <meshStandardMaterial color="#3d1a00" roughness={0.8} emissive="#200e00" emissiveIntensity={0.2} />
        </mesh>
        {/* Mug handle */}
        <mesh position={[0.15, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Steam particles */}
        <points ref={steamRef} position={[0, 0.12, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={steamPositions.length / 3}
              array={steamPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color="#ccccff"
            transparent
            opacity={0.4}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      </group>

      {/* === SMALL DECORATIVE ITEMS === */}
      {/* Plant pot */}
      <group position={[-1.8, 0.12, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.08, 0.18, 8]} />
          <meshStandardMaterial color="#1a0d00" roughness={0.9} />
        </mesh>
        {/* Plant leaves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 5) * Math.PI * 2) * 0.08,
              0.15 + Math.random() * 0.1,
              Math.cos((i / 5) * Math.PI * 2) * 0.08
            ]}
            rotation={[Math.random() * 0.5, (i / 5) * Math.PI * 2, Math.random() * 0.3]}
          >
            <planeGeometry args={[0.12, 0.18]} />
            <meshStandardMaterial
              color="#0d4a1a"
              side={THREE.DoubleSide}
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Phone */}
      <mesh position={[1.9, 0.06, -0.15]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.2]} />
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[1.9, 0.072, -0.15]} rotation={[0, -0.3, 0]}>
        <planeGeometry args={[0.085, 0.17]} />
        <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>

      {/* Ambient desk fill light from below */}
      <pointLight
        position={[0, -0.5, 0.5]}
        color="#1a1a4a"
        intensity={0.5}
        distance={3}
        decay={2}
      />

      {/* === FLOATING HOLOGRAPHIC CODE PANELS === */}
      {/* Panel 1 - left floating */}
      <HoloPanel
        ref={panel1Ref}
        position={[-2.2, 2.2, -1.5]}
        rotation={[0, 0.3, 0]}
        lines={['fun greet() {', '  println("Hello!")', '}']}
        color="#818cf8"
      />

      {/* Panel 2 - right floating */}
      <HoloPanel
        ref={panel2Ref}
        position={[2.3, 1.8, -1.3]}
        rotation={[0, -0.25, 0]}
        lines={['@Composable', 'fun Screen() {', '  Column { ... }', '}']}
        color="#a78bfa"
      />

      {/* Panel 3 - top center floating */}
      <HoloPanel
        ref={panel3Ref}
        position={[0.8, 2.6, -2]}
        rotation={[0.05, 0, 0.02]}
        lines={['git commit -m', '"✨ new feature"', 'git push origin main']}
        color="#6366f1"
      />
    </group>
  )
}

/**
 * A translucent holographic floating code panel
 */
import { forwardRef } from 'react'

const HoloPanel = forwardRef(({ position, rotation, lines, color }, ref) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 160
    const ctx = canvas.getContext('2d')

    // Transparent dark background
    ctx.fillStyle = 'rgba(10, 10, 30, 0.85)'
    ctx.fillRect(0, 0, 256, 160)

    // Border
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, 254, 158)

    // Header bar
    ctx.fillStyle = color + '33'
    ctx.fillRect(2, 2, 252, 20)

    // Dots
    ;['#ff5f57', '#ffbd2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c
      ctx.beginPath()
      ctx.arc(12 + i * 16, 12, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Code lines
    ctx.font = '13px "Courier New", monospace'
    lines.forEach((line, i) => {
      ctx.fillStyle = color
      ctx.fillText(line, 12, 45 + i * 22)
    })

    // Scan lines
    for (let y = 0; y < 160; y += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      ctx.fillRect(0, y, 256, 1)
    }

    return new THREE.CanvasTexture(canvas)
  }, [lines, color])

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.9, 0.56]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        emissive={color}
        emissiveIntensity={0.05}
        depthWrite={false}
      />
    </mesh>
  )
})

HoloPanel.displayName = 'HoloPanel'
