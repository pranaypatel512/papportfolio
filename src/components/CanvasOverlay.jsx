import { useTheme } from '../context/ThemeContext'

/**
 * A full-page overlay that sits between the Three.js canvas (z:0)
 * and the content (z:2). Applies a semi-transparent tint so text
 * remains readable on both dark and light themes.
 *
 * Dark theme: deep space overlay (gentle darkening + warmth)
 * Light theme: white overlay (70% opacity) so stars are subtle
 *
 * pointer-events: none — clicks pass through to content below.
 */
export default function CanvasOverlay() {
  const { theme } = useTheme()

  const overlayColor =
    theme === 'light'
      ? 'rgba(250, 250, 255, 0.72)'
      : 'rgba(5, 5, 16, 0.55)'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: overlayColor,
        pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }}
      aria-hidden="true"
    />
  )
}
