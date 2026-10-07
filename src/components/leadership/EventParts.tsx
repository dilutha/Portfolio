import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { ImageOff } from 'lucide-react'

export const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-5% 0px' },
} as const

/** Event photograph with a styled fallback if the asset fails to load. */
export function EventImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src?: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={clsx('relative overflow-hidden rounded-2xl border border-line bg-surface-2', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div role="img" aria-label={alt} className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-muted">
          <ImageOff aria-hidden size={22} />
          <span className="font-mono text-xs">Event photo coming soon</span>
        </div>
      )}
    </div>
  )
}

export function EventSection({
  id,
  kicker,
  title,
  children,
}: {
  id?: string
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <motion.section {...reveal} id={id} aria-labelledby={id ? `${id}-title` : undefined} className="mt-12 scroll-mt-4">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[#b9a6ff]">{kicker}</p>
      <h3 id={id ? `${id}-title` : undefined} className="mt-1.5 text-xl font-semibold text-ink sm:text-2xl">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </motion.section>
  )
}
