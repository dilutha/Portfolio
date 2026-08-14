import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent'
}

export function Badge({ children, className, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-tight',
        tone === 'accent'
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-line-strong bg-white/5 text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
