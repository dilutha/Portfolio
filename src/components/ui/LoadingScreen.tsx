import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MIN_DISPLAY_MS = 700

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf: number

    function tick(now: number) {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / MIN_DISPLAY_MS) * 100))
      setProgress(pct)
      if (elapsed < MIN_DISPLAY_MS) {
        raf = requestAnimationFrame(tick)
      } else {
        setVisible(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-void"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-3xl tracking-tight text-ink">
            <span className="text-accent">D</span>W
          </div>
          <div className="h-px w-40 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="font-mono text-xs tabular-nums text-ink-faint">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
