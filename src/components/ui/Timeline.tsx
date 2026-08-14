import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useScroll } from 'framer-motion'

export function Timeline({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })

  return (
    <div ref={containerRef} className="relative pl-8 sm:pl-10">
      <div className="absolute left-[3px] top-1 bottom-1 w-px bg-line sm:left-[7px]" />
      <motion.div
        style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
        className="absolute left-[3px] top-1 bottom-1 w-px bg-accent sm:left-[7px]"
      />
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  )
}

interface TimelineItemProps {
  title: string
  subtitle: string
  period: string
  index: number
  children?: ReactNode
}

export function TimelineItem({ title, subtitle, period, index, children }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(0,255,166,0.15)] sm:-left-10" />
      <p className="mb-1 font-mono text-xs tracking-widest text-accent">{period}</p>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-ink-muted">{subtitle}</p>
      {children}
    </motion.div>
  )
}
