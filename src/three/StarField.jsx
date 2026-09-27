import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * 10,000 star particles drifting slowly through space.
 * Subtle mouse-parallax rotation is applied by the parent ScrollCamera.
 */
export default function StarField() {
  const meshRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 10000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#818cf8'), // indigo
      new THREE.Color('#a78bfa'), // violet
      new THREE.Color('#c4b5fd'), // light purple
      new THREE.Color('#ffffff'), // white
      new THREE.Color('#6366f1'), // deep indigo
      new THREE.Color('#e0e7ff'), // lavender
    ]

    for (let i = 0; i < count; i++) {
      // Distribute in a large sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 30 + Math.random() * 70

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const color = palette[Math.floor(Math.random() * palette.length)]
      // Vary brightness
      const brightness = 0.4 + Math.random() * 0.6
      colors[i * 3] = color.r * brightness
      colors[i * 3 + 1] = color.g * brightness
      colors[i * 3 + 2] = color.b * brightness
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    // Very slow drift rotation
    meshRef.current.rotation.y += 0.00015
    meshRef.current.rotation.x += 0.00005
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
