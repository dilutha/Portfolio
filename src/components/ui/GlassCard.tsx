import { clsx } from 'clsx'
import { motion, type MotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps extends MotionProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article'
}

export function GlassCard({ children, className, ...motionProps }: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur-xl',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]',
        className,
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
