import { clsx } from 'clsx'

interface AmbientGlowProps {
  /** Which accent hue(s) to use — kept subtle and on-brand throughout. */
  tone?: 'accent' | 'violet' | 'mixed'
  className?: string
}

/**
 * Shared, near-zero-cost background glow used to give sections a felt sense
 * of continuity with the hero's constellation, without any extra WebGL cost.
 * Pure CSS: blurred radial blobs with a slow drift, respects the global
 * prefers-reduced-motion rule in index.css.
 */
export function AmbientGlow({ tone = 'accent', className }: AmbientGlowProps) {
  return (
    <div className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="animate-ambient-drift absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
      {tone === 'mixed' && (
        <div
          className="animate-ambient-drift-alt absolute right-[10%] top-24 h-[280px] w-[420px] rounded-full bg-violet/10 blur-[100px]"
          style={{ animationDelay: '-6s' }}
        />
      )}
      {tone === 'violet' && (
        <div className="animate-ambient-drift absolute left-1/2 top-0 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-violet/10 blur-[110px]" />
      )}
    </div>
  )
}
