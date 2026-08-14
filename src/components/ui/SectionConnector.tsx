import { motion } from 'framer-motion'

/**
 * A small drawn-in node/line accent bridging one section into the next —
 * reuses the same path-draw + pulsing-node motif already used in the
 * project diagrams and the education/volunteer timeline, so section seams
 * read as one connected system rather than stacked blocks.
 */
export function SectionConnector() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2"
    >
      <svg width="2" height="72" viewBox="0 0 2 72" className="overflow-visible">
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="72"
          stroke="var(--color-accent)"
          strokeOpacity={0.3}
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <circle cx="1" cy="72" r="2.5" fill="var(--color-accent)" />
        <circle cx="1" cy="72" r="2.5" fill="none" stroke="var(--color-accent)" strokeOpacity={0.35}>
          <animate attributeName="r" values="2.5;8;2.5" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
