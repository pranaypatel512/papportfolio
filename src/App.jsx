import React, { Suspense, lazy } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import BottomNav from './components/BottomNav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ToolkitAndTalks from './components/ToolkitAndTalks'
import OpenSource from './components/OpenSource'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'
import CanvasOverlay from './components/CanvasOverlay'
import Skills3D from './components/Skills3D'
import About3DStats from './components/About3DStats'
import { useScrollProgress } from './hooks/useScrollProgress'

// Lazy-load the Three.js background to avoid blocking first paint
const ThreeBackground = lazy(() => import('./three/ThreeBackground'))

function App() {
  const scrollProgress = useScrollProgress()

  return (
    <ThemeProvider>
      {/* ── Layer 0: Three.js WebGL canvas (fixed, behind everything) ── */}
      <Suspense fallback={null}>
        <ThreeBackground scrollProgress={scrollProgress} />
      </Suspense>

      {/* ── Layer 1: Theme-aware canvas overlay for readability ── */}
      <CanvasOverlay />

      {/* ── Layer 2: All page content ── */}
      <div
        className="App"
        style={{
          minHeight: '100vh',
          background: 'transparent',
          color: 'var(--text-primary)',
          paddingBottom: '100px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Hero />
        <About3DStats />
        <Experience />
        <Projects />
        <Skills3D />
        <ToolkitAndTalks />
        <OpenSource />
        <Recommendations />
        <Contact />
        <BottomNav />
      </div>
    </ThemeProvider>
  )
}

export default App
