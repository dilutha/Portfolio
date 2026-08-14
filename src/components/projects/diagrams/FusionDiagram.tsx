import { motion } from 'framer-motion'

const SOURCES = [
  { id: 'regression', label: 'LightGBM\nRegression', y: 20 },
  { id: 'classification', label: 'XGBoost\nClassification', y: 68 },
  { id: 'prophet', label: 'Prophet\nForecast', y: 116 },
  { id: 'shap', label: 'SHAP\nExplainer', y: 164 },
  { id: 'expert', label: 'Expert\nSystem', y: 212 },
]

const RISK_LEVELS = [
  { label: 'Low', color: '#00ffa6' },
  { label: 'Moderate', color: '#3ec5ff' },
  { label: 'High', color: '#f5b942' },
  { label: 'Critical', color: '#ff5c6c' },
]

export function FusionDiagram({ compact = false }: { compact?: boolean }) {
  const fusionX = 250
  const fusionY = 116

  return (
    <svg
      viewBox="0 0 540 260"
      className="h-full w-full"
      role="img"
      aria-label="Five model sources converging into a rule-based Decision Fusion engine, producing a risk level from Low to Critical"
    >
      <defs>
        <radialGradient id="fd-bg" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#12141c" />
          <stop offset="100%" stopColor="#0b0d13" />
        </radialGradient>
      </defs>
      <rect width="540" height="260" fill="url(#fd-bg)" />

      {SOURCES.map((s, i) => (
        <motion.path
          key={s.id}
          d={`M 90 ${s.y} C 160 ${s.y}, 190 ${fusionY}, ${fusionX - 34} ${fusionY}`}
          stroke="#2a2f3d"
          strokeWidth={1}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.06 }}
        />
      ))}

      {SOURCES.map((s, i) => (
        <motion.g
          key={s.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <rect x={10} y={s.y - 14} width={80} height={28} rx={8} fill="#161922" stroke="#232733" />
          {!compact &&
            s.label.split('\n').map((line, li) => (
              <text
                key={li}
                x={50}
                y={s.y - 2 + li * 10}
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="'JetBrains Mono', monospace"
                fill="#9aa3b6"
              >
                {line}
              </text>
            ))}
        </motion.g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <rect
          x={fusionX - 34}
          y={fusionY - 26}
          width={90}
          height={52}
          rx={12}
          fill="#0e2a22"
          stroke="#00ffa6"
          strokeOpacity={0.5}
        />
        <text
          x={fusionX + 11}
          y={fusionY - 4}
          textAnchor="middle"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          fill="#00ffa6"
        >
          Decision
        </text>
        <text
          x={fusionX + 11}
          y={fusionY + 10}
          textAnchor="middle"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
          fill="#00ffa6"
        >
          Fusion
        </text>
      </motion.g>

      {RISK_LEVELS.map((risk, i) => {
        const y = 60 + i * 46
        return (
          <motion.g
            key={risk.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
          >
            <motion.path
              d={`M ${fusionX + 56} ${fusionY} C ${fusionX + 100} ${fusionY}, ${fusionX + 110} ${y}, ${fusionX + 140} ${y}`}
              stroke={risk.color}
              strokeOpacity={0.35}
              strokeWidth={1}
              fill="none"
            />
            <circle cx={fusionX + 150} cy={y} r={4} fill={risk.color} />
            {!compact && (
              <text
                x={fusionX + 160}
                y={y + 3}
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
                fill="#9aa3b6"
              >
                {risk.label}
              </text>
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}
