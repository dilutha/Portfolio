import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'violet' | 'planned'
  title?: string
}

export function Badge({ children, className, tone = 'default', title }: BadgeProps) {
  return (
    <span
      title={title}
      className={clsx(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-tight',
        tone === 'accent' && 'border-accent/40 bg-accent/10 text-accent',
        tone === 'violet' && 'border-violet/50 bg-violet/10 text-[#b9a6ff]',
        tone === 'planned' && 'border-dashed border-ink-faint bg-transparent text-ink-muted',
        tone === 'default' && 'border-line-strong bg-white/5 text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
