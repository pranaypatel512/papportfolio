import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

/**
 * Post-processing effects: bloom glow + vignette.
 * Lazy-loaded to not block initial render.
 */
export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        intensity={0.9}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
      />
      <Vignette
        eskil={false}
        offset={0.35}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
