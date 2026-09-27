import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './Scene'

/**
 * The actual R3F Canvas. Separated from ThreeBackground so
 * it is only imported after WebGL detection passes.
 */
export default function ThreeCanvas({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 60, near: 0.1, far: 200 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  )
}
