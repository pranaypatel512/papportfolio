import { Suspense, lazy } from 'react'
import StarField from './StarField'
import DeskEnvironment from './DeskEnvironment'
import ScrollCamera from './ScrollCamera'

// Lazy-load postprocessing to avoid it blocking the main scene
const PostFX = lazy(() => import('./PostFX'))

/**
 * Root Three.js scene orchestrator.
 * Receives scroll progress for camera animation.
 */
export default function Scene({ scrollProgress }) {
  return (
    <>
      {/* Space background */}
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 25, 80]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#8888ff" />

      {/* Main key light — cool blue-violet */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.6}
        color="#b0c4ff"
      />

      {/* Rim light from behind/below — warm accent */}
      <pointLight
        position={[-8, 4, -6]}
        color="#6366f1"
        intensity={1.2}
        distance={25}
        decay={2}
      />

      {/* Fill light */}
      <pointLight
        position={[8, -2, 3]}
        color="#818cf8"
        intensity={0.6}
        distance={20}
        decay={2}
      />

      {/* Stars */}
      <StarField />

      {/* Desk scene */}
      <DeskEnvironment />

      {/* Scroll-driven camera */}
      <ScrollCamera scrollProgress={scrollProgress} />

      {/* Bloom/glow — lazy loaded */}
      <Suspense fallback={null}>
        <PostFX />
      </Suspense>
    </>
  )
}
