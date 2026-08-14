import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clsx } from 'clsx'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  as?: 'a' | 'button'
  target?: string
  rel?: string
  ariaLabel?: string
}

const variantStyles: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-void border border-accent hover:bg-accent-dim',
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-accent hover:text-accent',
  ghost: 'bg-white/5 text-ink border border-transparent hover:border-line-strong',
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLSpanElement>({
    strength: 0.3,
    disabled: reducedMotion,
  })

  const content = (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3',
        'font-mono text-sm font-medium tracking-tight transition-colors duration-300',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="inline-block" type="button">
      {content}
    </button>
  )
}
