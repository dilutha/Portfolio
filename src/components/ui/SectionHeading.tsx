import { motion, type Variants } from 'framer-motion'
import { clsx } from 'clsx'

interface SectionHeadingProps {
  index: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function SectionHeading({
  index,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx('mb-16', align === 'center' && 'text-center', className)}>
      <motion.p
        custom={0}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mb-4 font-mono text-sm tracking-widest text-accent"
      >
        {index}
      </motion.p>
      <motion.h2
        custom={1}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          custom={2}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15% 0px' }}
          className={clsx(
            'mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
