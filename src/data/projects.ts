export type ProjectTag = 'ai-ml' | 'web' | 'data' | 'uiux'

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
  /** Short project-type line shown above the title, e.g. "AI Career Intelligence Platform". */
  category?: string
  /** 'design' marks UI/UX work so it is never presented as a shipped software build. */
  kind?: 'engineering' | 'design'
  tags: ProjectTag[]
  summary: string
  description: string
  /** Technologies actually present in the repository / deliverable. */
  techStack: string[]
  /** Target-architecture technologies on the roadmap — never shown as implemented. */
  plannedStack?: string[]
  achievements: string[]
  features: string[]
  honestTradeoffs?: string[]
  links: ProjectLinks
  visual: ProjectVisual
  /** Optional supplementary architecture diagram shown on the case-study page only. */
  architectureDiagram?: 'langgraph' | 'fusion'
  /** Renders a dedicated, long-form case-study component on the detail page. */
  caseStudy?: 'careerlense' | 'pneumoscan'
  featured?: boolean
}

const UNISPORT_HUB_FIGMA_URL =
  'https://www.figma.com/proto/Nq7mn37Qpqwz2aNXu6HUMj/UniSport-Hub-%E2%80%93-UX-Prototype?node-id=2003-3&starting-point-node-id=2003%3A3&t=uBSJAM4RjfmGA7YE-1'


export const projects: Project[] = [
  {
    slug: 'careerlense-ai',
    title: 'CareerLense AI',
    category: 'AI / Generative AI / Full Stack',
    kind: 'engineering',
    tags: ['ai-ml', 'web', 'data'],
    summary:
      'An AI career-intelligence platform that measures career readiness against real job requirements — skill-gap analysis, CV tailoring, interview coaching, and personalised career recommendations, grounded in each candidate’s own profile data.',
    description:
      'CareerLense AI turns "I’m looking for a job" into "I’m ready for this job." It models a candidate’s CV, education, projects, experience, and skills as structured data, ingests and normalises real job postings, then combines deterministic matching with Gemini-powered reasoning to explain exactly where a candidate stands for a target role and what to do next. It is being built progressively: the product layer is live today on Next.js, Supabase, and Gemini, while a Python/FastAPI, RAG, and multi-agent target architecture is on the roadmap.',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Supabase',
      'PostgreSQL',
      'Google Gemini',
      'Zod',
      'Vitest',
      'REST API',
      'Framer Motion',
      'Three.js',
      'Vercel',
    ],
    plannedStack: [
      'Python',
      'FastAPI',
      'RAG',
      'LlamaIndex',
      'LangGraph',
      'pgvector',
      'Docker',
      'GitHub Actions',
      'AWS',
      'Snowflake',
      'Airflow',
      'dbt',
      'OpenTelemetry',
      'Prometheus',
      'Grafana',
      'Langfuse',
      'Kubernetes / EKS',
    ],
    achievements: [
      'Versioned REST API (/api/v1, 22 routes, OpenAPI spec) for profile, resumes, jobs, applications, interview, and career analysis — alongside a streaming NDJSON chat endpoint',
      '12 Supabase/PostgreSQL migrations modelling profiles, skills, resumes, jobs, matches, applications, interviews, roadmaps, and chat state, with Row Level Security on every user-owned table',
      'Multi-source job ingestion with normalisation, cross-source de-duplication, freshness checks, and deterministic match/rank scoring',
      'Gemini structured outputs validated with Zod for CV parsing and analysis; CV tailoring grounded in verified candidate facts rather than invented experience',
      'Unit-tested domain logic (Vitest) across agent state, job matching, readiness scoring, skill-gap priority, and API auth boundaries',
    ],
    features: [
      'Career readiness and skill-gap intelligence against real market demand for a target role',
      'CV upload, parsing, scoring, job-specific tailoring, ATS keyword analysis, and cover-letter generation',
      'Interview coach: role- and company-specific questions, answer evaluation, feedback, and follow-up questions',
      'Stateful conversational job-search agent that refines results across turns without re-asking',
      'Personalised learning roadmap, application tracking board, career analytics, and reminders',
    ],
    honestTradeoffs: [
      'The AI layer today runs as TypeScript route handlers in Next.js that assemble structured context from Supabase and call Gemini — Python/FastAPI services, LangGraph agents, LlamaIndex, and vector retrieval (pgvector) are target architecture, not yet implemented',
      'There are no Dockerfiles, CI workflows, or AWS deployment yet; the live app runs on Vercel with a managed Supabase project',
      'A WSO2 API Manager gateway has been designed for the /api/v1 surface, but WSO2 itself is not yet deployed — only the backend behind it is live-verified',
      'The SerpApi Google Jobs provider is implemented but not live-tested (no API key configured); local job-board discovery is live',
    ],
    links: {
      github: 'https://github.com/dilutha/CareerLense-Ai',
      live: 'https://careerlense-ai.vercel.app',
    },
    visual: { type: 'image', imageKey: 'careerlense', aspectRatio: '3/2' },
    caseStudy: 'careerlense',
    featured: true,
  },
  {
    slug: 'denguesense',
    title: 'DengueSense',
    category: 'Hybrid AI Decision-Support System for Dengue Outbreak Prediction',
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
    slug: 'kapruka-ai-agent',
    title: 'Kapruka AI Shopping Assistant',
    category: 'AI-Powered Shopping Assistant',
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
    slug: 'pneumonia-detection',
    title: 'PneumoScan AI',
    category: 'AI-Powered Pneumonia Detection from Chest X-Rays',
    kind: 'engineering',
    tags: ['ai-ml', 'web'],
    summary:
      'A full-stack clinical AI prototype designed for interpretable AI — a fine-tuned DenseNet121 flags pneumonia in chest X-rays and explains every prediction with Grad-CAM heatmaps.',
    description:
      'PneumoScan AI is a full-stack clinical AI prototype, designed for interpretable AI, that classifies chest X-ray images as NORMAL or PNEUMONIA using deep learning and provides visual explainability through Grad-CAM heatmaps. The goal is not only to classify an X-ray but also to make the model’s decision interpretable. It evolved from a Streamlit CNN prototype into a DenseNet121 transfer-learning model served by FastAPI, with a Next.js frontend and Supabase persistence.',
    techStack: [
      'DenseNet121',
      'TensorFlow / Keras',
      'Grad-CAM',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'OpenCV',
      'Python',
    ],
    achievements: [
      'DenseNet121 (ImageNet) fine-tuned in two phases for NORMAL vs PNEUMONIA classification at 224×224',
      'Reported project evaluation of AUC-ROC ~0.97+, up from ~0.88 for the legacy CNN prototype',
      'Grad-CAM heatmaps anchored on conv5_block16_concat explain every prediction',
    ],
    features: [
      'Drag-and-drop X-ray upload with prediction, confidence score, and severity indicator',
      'Original, heatmap, and overlay views of each X-ray',
      'Persistent prediction history in Supabase PostgreSQL and Storage',
    ],
    links: {
      github: 'https://github.com/dilutha/Pneumonia_X-tray_Detection',
    },
    visual: { type: 'image', imageKey: 'pneumonia' },
    caseStudy: 'pneumoscan',
    featured: true,
  },
  {
    slug: 'ridepulse',
    title: 'RidePulse',
    category: 'AI-Driven Transport Intelligence',
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
    title: 'Farmer2Market',
    category: 'Agricultural Technology',
    tags: ['ai-ml', 'web'],
    summary:
      'An agricultural marketplace that connects farmers directly with buyers and adds ML-driven crop price prediction (XGBoost) and demand forecasting (Prophet).',
    description:
      'Farmer2Market pairs a Laravel MVC marketplace — Blade views for farmers, buyers, and administrators — with a separate Python ML service, so farmers can see predicted prices and forecast demand for their crops instead of guessing which crops to bring to market.',
    techStack: ['Laravel', 'Blade', 'PHP', 'MVC', 'XGBoost', 'Prophet', 'FastAPI', 'Python', 'Streamlit'],
    achievements: [
      'Per-crop price prediction models (XGBoost) and per-crop demand forecasting models (Prophet) trained on agricultural data',
      'ML models served to the marketplace through a separate Python API (FastAPI)',
      'Laravel MVC application with controllers and models for farmers, buyers, crops, carts, and administration',
    ],
    features: [
      'Crop price prediction',
      'Crop demand forecasting',
      'Direct farmer-to-market connection flow with buyer and admin dashboards',
      'Standalone Streamlit app for exploring price and demand predictions',
    ],
    links: {
      github: 'https://github.com/dilutha/farm-to-market',
    },
    visual: { type: 'image', imageKey: 'farmToMarket' },
  },
  {
    slug: 'unisport-hub',
    title: 'UniSport Hub',
    category: 'UI/UX Design',
    kind: 'design',
    tags: ['uiux'],
    summary:
      'A university sports platform UX/UI concept focused on improving the digital experience for university sports communities — designed and prototyped in Figma.',
    description:
      'UniSport Hub is a design project, not a software build. It reimagines how students and university sports teams discover campus grounds, courts, and indoor facilities and reserve them for matches and practice. The work follows a design-thinking process — understanding the booking experience, structuring the information architecture, mapping user flows, wireframing, and taking the result to a responsive, high-fidelity interactive prototype in Figma.',
    techStack: [
      'Figma',
      'UX Research',
      'Design Thinking',
      'Information Architecture',
      'User Flows',
      'Wireframing',
      'High-fidelity UI',
      'Interactive Prototyping',
      'Responsive Design',
    ],
    achievements: [
      'Design-thinking process from problem framing and user needs through to an interactive prototype',
      'Information architecture organised around three primary jobs: explore venues, check availability, and book',
      'User flows and wireframes for venue discovery, booking, and booking management before any visual design',
      'High-fidelity, responsive UI with a consistent visual system rooted in university branding',
    ],
    features: [
      'Venue explorer for grounds, courts, and indoor sports complexes, with sport types and availability status',
      'Availability calendar and a short, guided booking flow for matches and practices',
      '"My Bookings" view for managing upcoming reservations',
      'Campus map view for finding venues across the university',
      'Usability-focused layout: clear status labels, large touch targets, and minimal steps to book',
    ],
    links: {
      external: { label: 'View Prototype', href: UNISPORT_HUB_FIGMA_URL },
    },
    visual: { type: 'image', imageKey: 'unisportHub', aspectRatio: '3/2' },
  },
  {
    slug: 'power-bi-dashboard',
    title: 'Power BI Analytics Dashboard',
    category: 'Data Analytics / Business Intelligence',
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
  { id: 'uiux', label: 'UI/UX Design' },
]

export const TAG_LABEL: Record<ProjectTag, string> = {
  'ai-ml': 'AI & ML',
  web: 'Web',
  data: 'Data',
  uiux: 'UI/UX',
}
