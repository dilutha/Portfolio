import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { ArrowDown, ArrowRight, Crosshair } from 'lucide-react'
import { modelArchitecture, type LayerKind } from '@/data/pneumoscan'
import { FlowConnector } from '@/components/projects/case-study/primitives'

const KIND_META: Record<LayerKind, { label: string; stripe: string }> = {
  io: { label: 'Input', stripe: 'bg-ink-muted' },
  backbone: { label: 'Dense block', stripe: 'bg-accent' },
  anchor: { label: 'Grad-CAM', stripe: 'bg-[#ff6b4a]' },
  pool: { label: 'Pooling', stripe: 'bg-cyan' },
  norm: { label: 'Normalization', stripe: 'bg-[#b9a6ff]' },
  dense: { label: 'Fully connected', stripe: 'bg-accent' },
  dropout: { label: 'Regularization', stripe: 'bg-ink-faint' },
  output: { label: 'Output', stripe: 'bg-[#ffb547]' },
}

const reveal = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
} as const

/** DenseNet121 transfer-learning model, drawn as backbone → Grad-CAM anchor → classification head → classes. */
export function ModelArchitectureDiagram() {
  const m = modelArchitecture

  return (
    <div
      role="figure"
      aria-label="PneumoScan AI model: 224 by 224 by 3 input, DenseNet121 backbone of four dense blocks with transition layers, conv5_block16_concat Grad-CAM anchor, then a classification head of global average pooling, batch normalization, dense 512, dropout 0.4, dense 256, dropout 0.2 and a sigmoid output classifying NORMAL or PNEUMONIA"
      className="rounded-3xl border border-line bg-void/60 p-4 sm:p-6"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-1.5 font-mono text-xs text-ink">
          {m.input.label} <span className="text-ink-muted">· {m.input.detail}</span>
        </span>
      </div>
      <FlowConnector />

      {/* Backbone */}
      <motion.div {...reveal} className="rounded-2xl border border-accent/25 bg-surface-2/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink">DenseNet121 backbone</h3>
          <span className="font-mono text-[11px] text-ink-muted">ImageNet pretrained · fine-tuned</span>
        </div>
        <ol className="mt-4 flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center lg:gap-1">
          {m.backbone.map((layer, i) => (
            <li key={`${layer.label}-${i}`} className="flex flex-col items-center lg:min-w-0 lg:flex-1 lg:flex-row">
              <span
                className={clsx(
                  'flex w-full items-center justify-center rounded-lg border px-2 text-center font-mono text-[11px]',
                  layer.kind === 'backbone'
                    ? 'border-accent/40 bg-accent/10 py-2.5 text-accent lg:h-16 lg:py-0'
                    : 'border-cyan/30 bg-cyan/5 py-1.5 text-cyan lg:h-11 lg:py-0',
                )}
              >
                {layer.label}
              </span>
              {i < m.backbone.length - 1 && (
                <>
                  <ArrowDown aria-hidden size={12} className="mt-1.5 text-ink-faint lg:hidden" />
                  <ArrowRight aria-hidden size={12} className="mx-0.5 hidden shrink-0 text-ink-faint lg:block" />
                </>
              )}
            </li>
          ))}
        </ol>
      </motion.div>
      <FlowConnector />

      {/* Grad-CAM anchor */}
      <motion.div {...reveal} className="flex justify-center">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-[#ff6b4a]/40 bg-[#ff6b4a]/10 px-4 py-2.5">
          <Crosshair aria-hidden size={14} className="text-[#ff8a6e]" />
          <code className="break-all font-mono text-xs text-ink">{m.anchor}</code>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff8a6e]">Grad-CAM anchor</span>
        </div>
      </motion.div>
      <FlowConnector />

      {/* Classification head */}
      <motion.div {...reveal} className="mx-auto max-w-xl rounded-2xl border border-line bg-surface-2/70 p-4 sm:p-5">
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink">Classification head</h3>
        <ol className="mt-4 flex flex-col gap-1.5">
          {m.head.map((layer) => (
            <li
              key={layer.label}
              className="flex items-center gap-3 overflow-hidden rounded-lg border border-line bg-void/50 pr-3"
            >
              <span aria-hidden className={clsx('w-1 self-stretch', KIND_META[layer.kind].stripe)} />
              <span className="flex-1 py-2 font-mono text-xs text-ink">{layer.label}</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-muted sm:inline">
                {KIND_META[layer.kind].label}
              </span>
            </li>
          ))}
        </ol>
      </motion.div>
      <FlowConnector label="SIGMOID ≥ THRESHOLD" />

      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        {m.outputs.map((label) => (
          <span
            key={label}
            className={clsx(
              'rounded-xl border px-3 py-2.5 text-center font-mono text-xs tracking-widest',
              label === 'PNEUMONIA'
                ? 'border-[#ffb547]/40 bg-[#ffb547]/10 text-[#ffc670]'
                : 'border-accent/40 bg-accent/10 text-accent',
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
