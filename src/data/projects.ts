export type ProjectTag = 'ai-ml' | 'web' | 'data'

export interface ProjectLinks {
  github?: string
  live?: string
  external?: { label: string; href: string }
}

export type ProjectVisual =
  | { type: 'image'; imageKey: string; aspectRatio?: string }
  | { type: 'diagram'; kind: 'langgraph' | 'fusion' }

export interface Project {
  slug: string
  title: string
  tags: ProjectTag[]
  summary: string
  description: string
  techStack: string[]
  achievements: string[]
  features: string[]
  honestTradeoffs?: string[]
  links: ProjectLinks
  visual: ProjectVisual
  /** Optional supplementary architecture diagram shown on the case-study page only. */
  architectureDiagram?: 'langgraph' | 'fusion'
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'kapruka-ai-agent',
    title: 'Kapruka AI Shopping Assistant',
    tags: ['ai-ml', 'web'],
    summary:
      'A multilingual agentic shopping assistant for the Kapruka e-commerce platform — LangGraph orchestration, real MCP tool-calling, and conversational checkout in English, Sinhala, and Singlish.',
    description:
      'Instead of filters and keywords, customers chat naturally with an AI that understands intent, recommends products, and carries a conversation through checkout. Built as a final-year academic project, it goes well past a thin LLM wrapper: a LangGraph state machine routes every message through language detection, intent classification, and one of six specialised agents, grounded in Kapruka’s real product catalog via the Model Context Protocol.',
    techStack: [
      'Next.js 16',
      'React 19',
      'NestJS',
      'LangGraph',
      'LangChain',
      'Google Gemini',
      'Model Context Protocol',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'Clerk',
      'Tailwind CSS 4',
    ],
    achievements: [
      'LangGraph StateGraph orchestrates 6 specialised agents (search, recommend, checkout, track, gift, chit-chat) with confidence-based clarification fallback',
      'Real MCP client to a live Kapruka MCP server (7 tools) with a circuit breaker, reconnection backoff, and heartbeat monitoring',
      'Three-tier language detection (Sinhala Unicode → Singlish heuristics → Gemini fallback) designed to keep 95%+ of detections under 1ms with no API call',
      'Layered security: hardened Helmet CSP, four-tier Redis rate limiting, HMAC-signed guest sessions, Zod validation, PCI SAQ-A boundary — card data never touches the app',
    ],
    features: [
      'Conversational product discovery, recommendations, and comparison across natural-language queries',
      'Context-aware memory: budget, recipient, occasion, and cart persist across turns via Postgres + Redis',
      'Conversational checkout that auto-populates recipient, address, city, district, and delivery date',
      'Real-time streaming responses over SSE with typed event chunks (text, tool calls, checkout-ready, state updates)',
      'Order tracking and delivery-status checks grounded in live Kapruka data, not simulated',
    ],
    honestTradeoffs: [
      'The "AI checkout" is intentionally honest: it locks catalog prices for 60 minutes and hands off to a real Kapruka checkout URL — it never simulates payment or fabricates a confirmation',
      'A `docker-compose.yml` defines the local dev stack, but no Dockerfiles, CI pipeline, or cloud deployment config exist yet — there is no live demo',
      'A substantial voice-interaction pipeline (speech-to-text/text-to-speech) is already implemented in code, even though the README still lists "Voice Shopping" under future work',
    ],
    links: {
      github: 'https://github.com/dilutha/kapruka-Agent',
    },
    visual: { type: 'image', imageKey: 'kapruka', aspectRatio: '3/2' },
    architectureDiagram: 'langgraph',
    featured: true,
  },
  {
    slug: 'denguesense',
    title: 'DengueSense',
    tags: ['ai-ml', 'data'],
    summary:
      'An explainable hybrid AI decision-support system for early dengue outbreak prediction across 25 Sri Lankan districts, fusing five independent models into one auditable recommendation.',
    description:
      'DengueSense combines regression, classification, time-series forecasting, and a rule-based expert system, then fuses their outputs through a deliberately transparent — not learned — decision engine. In a public-health context, the priority is an auditable "here is exactly why this escalated," not a marginally better black box.',
    techStack: [
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'PostgreSQL (Supabase)',
      'LightGBM',
      'XGBoost',
      'Prophet',
      'SHAP',
      'scikit-learn',
    ],
    achievements: [
      'LightGBM multi-horizon case regression: R² 0.894, MAPE 28.98% (t+1 horizon)',
      'XGBoost 4-class risk classification: 83.5% accuracy, ROC-AUC (macro) 0.964',
      '25 per-district Facebook Prophet models for weekly case forecasting',
      'A 26-rule forward-chaining Expert System plus SHAP-driven natural-language explanations',
      '105-test backend security suite covering auth, rate limiting, model-integrity checksums, and path-traversal defenses',
    ],
    features: [
      'Decision Fusion engine with an asymmetric, caution-biased escalation policy — a single corroborating high-risk signal escalates the alert, and it never auto-downgrades below the classifier’s own level',
      'Confidence scoring that weights cross-source model agreement (65%) above any single model’s internal confidence (35%)',
      'SHAP TreeExplainer generates natural-language explanations for every prediction (e.g. "risk is Critical mainly due to an outlier case count and a rising 4-week trend")',
      'GIS-aware district centroids feed both the models and a map endpoint',
      'Twelve read-only dashboard endpoints (trends, weather correlation, model performance, SHAP summary, fusion stats) designed to degrade gracefully on empty data',
      'Every ML artifact is SHA-256 checksummed and verified before deserialization',
    ],
    honestTradeoffs: [
      'The README describes a Next.js dashboard, but the frontend was a deliberate Phase 1 backend-only build — no UI yet consumes the new dashboard endpoints',
      'Decision Fusion weights (0.5 / 0.3 / 0.2) are fixed by design, not learned or independently calibrated',
      'Rate limiting and dashboard caching are in-memory and single-process — would need Redis for a multi-instance deployment',
      'Two real data bugs were found and fixed via live verification (a centroid key-casing mismatch and a misspelled district name) — documented rather than hidden',
    ],
    links: {
      github: 'https://github.com/dilutha/DengueSense',
    },
    visual: { type: 'image', imageKey: 'denguesense', aspectRatio: '3/2' },
    architectureDiagram: 'fusion',
    featured: true,
  },
  {
    slug: 'ridepulse',
    title: 'RidePulse — Transport Intelligence',
    tags: ['ai-ml', 'web'],
    summary:
      'AI-driven public transport platform with digital ticketing, real-time analytics, and ML-powered demand forecasting.',
    description:
      'A mobile-first transport intelligence system connecting commuters, operators, and demand forecasting in one platform — digital ticketing on Flutter, a Spring Boot backend, and ML models forecasting route demand.',
    techStack: ['Flutter', 'Spring Boot', 'PostgreSQL', 'Machine Learning'],
    achievements: [
      'End-to-end mobile app with digital ticketing and real-time analytics',
      'ML-powered demand forecasting feeding operational decisions',
    ],
    features: [
      'Digital ticketing flow for commuters',
      'Real-time analytics dashboard',
      'ML-powered route demand forecasting',
    ],
    links: {
      github: 'https://github.com/dilutha/RidePulse',
      live: 'https://ridepulse-e28ba.web.app/',
    },
    visual: { type: 'image', imageKey: 'ridepulse' },
  },
  {
    slug: 'farm-to-market',
    title: 'Farmer-to-Market Optimization',
    tags: ['ai-ml', 'web'],
    summary:
      'A Laravel-based platform integrating XGBoost and Prophet models for crop demand forecasting and price prediction, connecting farmers directly with markets.',
    description:
      'A full-stack platform that pairs a Laravel marketplace with a Flask-served ML layer, so farmers get demand forecasts and price predictions instead of guessing which crops to bring to market.',
    techStack: ['Laravel', 'XGBoost', 'Prophet', 'Flask'],
    achievements: [
      'Crop demand forecasting and price prediction models serving the marketplace directly',
      'Full-stack integration between a Laravel application and a Flask ML service',
    ],
    features: [
      'Crop price prediction',
      'Demand forecasting per crop/market',
      'Direct farmer-to-market connection flow',
    ],
    links: {
      github: 'https://github.com/dilutha/farm-to-market',
    },
    visual: { type: 'image', imageKey: 'farmToMarket' },
  },
  {
    slug: 'pneumonia-detection',
    title: 'Pneumonia Detection from Chest X-rays',
    tags: ['ai-ml'],
    summary:
      'A CNN-based system for automated pneumonia detection from chest X-rays, with an interactive Streamlit dashboard.',
    description:
      'A deep-learning diagnostic aid: a convolutional neural network trained on chest X-ray imagery, wrapped in an interactive Streamlit dashboard for exploring predictions.',
    techStack: ['TensorFlow', 'Keras', 'Streamlit', 'Python'],
    achievements: [
      'CNN model trained for automated pneumonia detection from chest X-ray images',
      'Interactive Streamlit dashboard for live inference and exploration',
    ],
    features: ['Chest X-ray image classification', 'Interactive prediction dashboard'],
    links: {
      github: 'https://github.com/dilutha/Pneumonia_X-tray_Detection',
    },
    visual: { type: 'image', imageKey: 'pneumonia' },
  },
  {
    slug: 'power-bi-dashboard',
    title: 'Power BI Analytics Dashboard',
    tags: ['data'],
    summary:
      'A business intelligence dashboard providing real-time insights and data visualization for strategic decision-making.',
    description:
      'A Power BI dashboard built for strategic decision-making — DAX-driven measures and SQL data modeling behind an interactive, real-time reporting layer.',
    techStack: ['Power BI', 'SQL', 'DAX'],
    achievements: ['Real-time BI dashboard supporting strategic decision-making'],
    features: ['Interactive data visualization', 'DAX-driven business measures'],
    links: {
      external: {
        label: 'View on LinkedIn',
        href: 'https://www.linkedin.com/posts/dilutha-weerasingha-a1568b177_powerbi-datavisualization-datascience-activity-7384281675087798272-mj7k',
      },
    },
    visual: { type: 'image', imageKey: 'powerBi' },
  },
]

export const projectFilters: { id: 'all' | ProjectTag; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'web', label: 'Web Development' },
  { id: 'data', label: 'Data Analytics' },
]
