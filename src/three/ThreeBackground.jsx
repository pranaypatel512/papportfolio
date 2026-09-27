import { Suspense, lazy } from 'react'

const ThreeCanvas = lazy(() => import('./ThreeCanvas'))

/**
 * Detects if device can handle WebGL and loads the Three.js canvas lazily.
 * Falls back gracefully on low-end devices.
 */
function canRunWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export default function ThreeBackground({ scrollProgress }) {
  if (typeof window !== 'undefined' && !canRunWebGL()) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <ThreeCanvas scrollProgress={scrollProgress} />
      </Suspense>
    </div>
  )
}
