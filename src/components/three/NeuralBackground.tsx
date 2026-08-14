import { lazy, Suspense } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLowPowerDevice } from '@/hooks/useLowPowerDevice'

const ParticleField = lazy(() =>
  import('./ParticleField').then((m) => ({ default: m.ParticleField })),
)

function StaticGradientFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(60% 50% at 50% 30%, rgba(0,255,166,0.14), transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(139,107,255,0.12), transparent 70%)',
      }}
    />
  )
}

export function NeuralBackground() {
  const reducedMotion = useReducedMotion()
  const lowPower = useLowPowerDevice()

  if (reducedMotion) {
    return <StaticGradientFallback />
  }

  return (
    <Suspense fallback={<StaticGradientFallback />}>
      <ParticleField density={lowPower ? 'light' : 'full'} />
    </Suspense>
  )
}
