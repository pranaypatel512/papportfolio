import { useState, useEffect } from 'react'

/**
 * Returns a normalized scroll progress value from 0 (top) to 1 (bottom).
 * Passive listener for performance.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler() // seed initial value
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}
