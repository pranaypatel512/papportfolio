import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Drives camera movement based on scroll progress (0-1).
 * Also applies subtle mouse parallax tilt.
 *
 * Camera journey:
 *  0.00 – 0.20  Hero:       face the desk, slight downward angle
 *  0.20 – 0.50  Exp/Work:   pull back, tilt up, stars reveal
 *  0.50 – 0.80  Skills:     rotate slightly right, stars prominent
 *  0.80 – 1.00  Contact:    settle forward, minimal movement
 */
export default function ScrollCamera({ scrollProgress }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({
    posX: 0, posY: 2, posZ: 8,
    rotX: -0.1, rotY: 0
  })

  // Track mouse
  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
  }

  useFrame((state, delta) => {
    const p = scrollProgress

    let targetPosX = 0
    let targetPosY = 2
    let targetPosZ = 8
    let targetRotX = -0.1
    let targetRotY = 0

    if (p < 0.2) {
      // Hero: slight downward look at desk
      const t = p / 0.2
      targetPosY = THREE.MathUtils.lerp(2, 2.5, t)
      targetPosZ = THREE.MathUtils.lerp(8, 9, t)
      targetRotX = THREE.MathUtils.lerp(-0.1, -0.15, t)
    } else if (p < 0.5) {
      // Experience / Projects: pull back, reveal stars
      const t = (p - 0.2) / 0.3
      targetPosY = THREE.MathUtils.lerp(2.5, 4, t)
      targetPosZ = THREE.MathUtils.lerp(9, 14, t)
      targetRotX = THREE.MathUtils.lerp(-0.15, -0.25, t)
      targetRotY = THREE.MathUtils.lerp(0, -0.08, t)
    } else if (p < 0.8) {
      // Skills / About: rotate slightly, stars very visible
      const t = (p - 0.5) / 0.3
      targetPosY = THREE.MathUtils.lerp(4, 5, t)
      targetPosZ = THREE.MathUtils.lerp(14, 16, t)
      targetRotX = THREE.MathUtils.lerp(-0.25, -0.18, t)
      targetRotY = THREE.MathUtils.lerp(-0.08, 0.06, t)
    } else {
      // Contact: settle forward
      const t = (p - 0.8) / 0.2
      targetPosY = THREE.MathUtils.lerp(5, 4, t)
      targetPosZ = THREE.MathUtils.lerp(16, 13, t)
      targetRotX = THREE.MathUtils.lerp(-0.18, -0.12, t)
      targetRotY = THREE.MathUtils.lerp(0.06, 0, t)
    }

    // Mouse parallax (subtle)
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    targetPosX = mx * 0.4
    targetRotY += mx * 0.03
    targetRotX += my * 0.02

    // Store targets
    const tgt = targetRef.current
    tgt.posX = targetPosX
    tgt.posY = targetPosY
    tgt.posZ = targetPosZ
    tgt.rotX = targetRotX
    tgt.rotY = targetRotY

    // Smoothly interpolate camera (lerp factor per frame)
    const lf = 1 - Math.pow(0.05, delta)

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tgt.posX, lf)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, tgt.posY, lf)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tgt.posZ, lf)
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, tgt.rotX, lf)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, tgt.rotY, lf)
  })

  return null
}
