import { motion } from 'framer-motion'

interface Node {
  id: string
  label: string
  x: number
  y: number
  kind: 'entry' | 'router' | 'agent' | 'exit'
}

const NODES: Node[] = [
  { id: 'lang', label: 'Language\nDetector', x: 40, y: 100, kind: 'entry' },
  { id: 'intent', label: 'Intent\nClassifier', x: 150, y: 100, kind: 'router' },
  { id: 'search', label: 'Search', x: 280, y: 20, kind: 'agent' },
  { id: 'recommend', label: 'Recommend', x: 280, y: 62, kind: 'agent' },
  { id: 'checkout', label: 'Checkout', x: 280, y: 104, kind: 'agent' },
  { id: 'track', label: 'Track', x: 280, y: 146, kind: 'agent' },
  { id: 'gift', label: 'Gift', x: 280, y: 188, kind: 'agent' },
  { id: 'chitchat', label: 'Chit-chat', x: 280, y: 230, kind: 'agent' },
  { id: 'format', label: 'Response\nFormatter', x: 400, y: 125, kind: 'exit' },
]

const EDGES: [string, string][] = [
  ['lang', 'intent'],
  ['intent', 'search'],
  ['intent', 'recommend'],
  ['intent', 'checkout'],
  ['intent', 'track'],
  ['intent', 'gift'],
  ['intent', 'chitchat'],
  ['search', 'format'],
  ['recommend', 'format'],
  ['checkout', 'format'],
  ['track', 'format'],
  ['gift', 'format'],
  ['chitchat', 'format'],
]

const NODE_COLOR: Record<Node['kind'], string> = {
  entry: '#3ec5ff',
  router: '#8b6bff',
  agent: '#00ffa6',
  exit: '#f5f7fb',
}

function findNode(id: string) {
  return NODES.find((n) => n.id === id)!
}

export function LangGraphDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 440 260"
      className="h-full w-full"
      role="img"
      aria-label="LangGraph agent orchestration flow: language detector to intent classifier, fanning out to six specialised agents, converging to a response formatter"
    >
      <defs>
        <radialGradient id="lg-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#12141c" />
          <stop offset="100%" stopColor="#0b0d13" />
        </radialGradient>
      </defs>
      <rect width="440" height="260" fill="url(#lg-bg)" />

      {EDGES.map(([from, to], i) => {
        const a = findNode(from)
        const b = findNode(to)
        return (
          <motion.path
            key={`${from}-${to}`}
            d={`M ${a.x + 24} ${a.y} C ${a.x + 60} ${a.y}, ${b.x - 60} ${b.y}, ${b.x - 24} ${b.y}`}
            stroke="#2a2f3d"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.04, ease: 'easeInOut' }}
          />
        )
      })}

      {NODES.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <circle cx={node.x} cy={node.y} r={compact ? 5 : 6} fill={NODE_COLOR[node.kind]} />
          <circle
            cx={node.x}
            cy={node.y}
            r={compact ? 5 : 6}
            fill="none"
            stroke={NODE_COLOR[node.kind]}
            strokeOpacity={0.35}
          >
            <animate attributeName="r" values={`6;14;6`} dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
          {!compact && (
            node.label.split('\n').map((line, li) => (
              <text
                key={li}
                x={node.x}
                y={node.y + 18 + li * 11}
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="'JetBrains Mono', monospace"
                fill="#9aa3b6"
              >
                {line}
              </text>
            ))
          )}
        </motion.g>
      ))}
    </svg>
  )
}
