/**
 * CareerLense AI case-study content.
 *
 * Every node carries an implementation status verified against the public
 * repository (github.com/dilutha/CareerLense-Ai):
 *   live    — implemented in the repo and running in the deployed app
 *   partial — the capability exists today, but not yet in its target form
 *   planned — target architecture / roadmap only
 */
import type { BuildStatus, StatusItem } from './caseStudy'

export type { BuildStatus, StatusItem }

export interface ArchLayer {
  id: string
  title: string
  subtitle: string
  status: BuildStatus
  today?: string
  items: StatusItem[]
}

export const overview = {
  problem:
    'Students and early-career candidates apply blind. Job postings list dozens of requirements, CVs are written once and sent everywhere, and nobody tells a candidate how far they actually are from a specific role — or what to do about it. Generic chatbots answer questions, but they don’t know the candidate, the job market, or the gap between them.',
  solution:
    'CareerLense AI models the candidate and the market as structured data, then reasons over both. A candidate’s CV, education, projects, experience, and skills are parsed into a profile; job postings are ingested, cleaned, and de-duplicated; deterministic scoring measures match and skill gaps; and an LLM layer turns those signals into explanations, tailored CVs, interview practice, and a concrete next step.',
  progressive:
    'The platform is being developed progressively. The product layer — Next.js, Supabase/PostgreSQL, and Gemini — is live today. The Python/FastAPI services, vector retrieval (pgvector + LlamaIndex), LangGraph agents, cloud infrastructure, and observability stack shown below are the target architecture and are clearly marked as planned.',
}

export const keyFeatures: { title: string; body: string; status: BuildStatus }[] = [
  {
    title: 'Career readiness & skill gaps',
    body: 'Readiness score for a target role, prioritised skill gaps against real market demand, and a next-best-action.',
    status: 'live',
  },
  {
    title: 'CV intelligence',
    body: 'PDF/DOCX parsing, structured analysis and scoring, job-specific tailoring, ATS keyword comparison, and cover letters.',
    status: 'live',
  },
  {
    title: 'Job discovery & matching',
    body: 'Multi-source ingestion, normalisation, cross-source de-duplication, and transparent match/rank scoring.',
    status: 'live',
  },
  {
    title: 'Interview coach',
    body: 'Role- and company-specific questions, answer evaluation with feedback, and adaptive follow-up questions.',
    status: 'live',
  },
  {
    title: 'Conversational career agent',
    body: 'Streaming chat that remembers search criteria across turns and pulls in profile, CV, job, and application context.',
    status: 'live',
  },
  {
    title: 'Roadmaps, tracking & analytics',
    body: 'Personalised learning roadmap, application pipeline board, response/offer analytics, and reminders.',
    status: 'live',
  },
]

export const systemArchitecture: {
  presentation: ArchLayer
  api: ArchLayer
  engines: ArchLayer[]
  orchestration: ArchLayer[]
  data: ArchLayer
  analytics: ArchLayer
  providers: ArchLayer
  observability: ArchLayer
  infrastructure: ArchLayer
} = {
  presentation: {
    id: 'presentation',
    title: 'Presentation Layer',
    subtitle: 'Next.js · TypeScript · Tailwind CSS',
    status: 'live',
    items: [
      { label: 'Dashboard', status: 'live' },
      { label: 'Jobs', status: 'live' },
      { label: 'CV', status: 'live' },
      { label: 'Career Agent', status: 'live' },
      { label: 'Interview', status: 'live' },
      { label: 'Applications', status: 'live' },
    ],
  },
  api: {
    id: 'api',
    title: 'API Layer',
    subtitle: 'FastAPI / REST API',
    status: 'partial',
    today:
      'Today: a versioned REST API (/api/v1, 22 routes, OpenAPI spec) runs as Next.js route handlers. A dedicated FastAPI service is planned.',
    items: [
      { label: '/auth', status: 'partial', note: 'Supabase Auth' },
      { label: '/jobs', status: 'live' },
      { label: '/resume', status: 'live' },
      { label: '/career', status: 'live' },
      { label: '/ai', status: 'live' },
      { label: '/rag', status: 'planned' },
      { label: '/agent', status: 'partial', note: 'Streaming /api/chat' },
      { label: '/applications', status: 'live' },
      { label: '/health', status: 'live' },
      { label: '/metrics', status: 'planned' },
    ],
  },
  engines: [
    {
      id: 'career-engine',
      title: 'Career Engine',
      subtitle: 'Deterministic career logic',
      status: 'live',
      items: [
        { label: 'Job Matching', status: 'live' },
        { label: 'Skill Gap', status: 'live' },
        { label: 'Career Planning', status: 'live' },
        { label: 'CV Analysis', status: 'live' },
        { label: 'Interview', status: 'live' },
      ],
    },
    {
      id: 'ai-engine',
      title: 'AI Engine',
      subtitle: 'LLM reasoning & generation',
      status: 'partial',
      items: [
        { label: 'LLM', status: 'live', note: 'Gemini' },
        { label: 'RAG', status: 'planned' },
        { label: 'Agents', status: 'partial', note: 'Stateful TS agent' },
        { label: 'Embeddings', status: 'planned' },
        { label: 'Evaluation', status: 'planned' },
      ],
    },
    {
      id: 'data-engine',
      title: 'Data Engine',
      subtitle: 'Job & market data pipeline',
      status: 'partial',
      items: [
        { label: 'Job Ingestion', status: 'live' },
        { label: 'ETL / ELT', status: 'partial', note: 'In-app pipeline' },
        { label: 'Cleaning', status: 'live' },
        { label: 'Deduplication', status: 'live' },
        { label: 'Transformation', status: 'live' },
      ],
    },
  ],
  orchestration: [
    {
      id: 'llamaindex',
      title: 'LlamaIndex',
      subtitle: 'RAG orchestration',
      status: 'planned',
      items: [
        { label: 'RAG', status: 'planned' },
        { label: 'Retrieval', status: 'planned' },
      ],
    },
    {
      id: 'langgraph',
      title: 'LangGraph',
      subtitle: 'Agent orchestration',
      status: 'planned',
      items: [
        { label: 'AI Agents', status: 'planned' },
        { label: 'Workflows', status: 'planned' },
      ],
    },
  ],
  data: {
    id: 'data-layer',
    title: 'Data Layer',
    subtitle: 'PostgreSQL / Supabase + pgvector',
    status: 'partial',
    today: 'Today: Supabase PostgreSQL with 12 migrations and Row Level Security. pgvector is planned.',
    items: [
      { label: 'User Data', status: 'live' },
      { label: 'CV Data', status: 'live' },
      { label: 'Applications', status: 'live' },
      { label: 'Job Data', status: 'live' },
      { label: 'Skills', status: 'live' },
      { label: 'Companies', status: 'partial', note: 'Stored on job records' },
      { label: 'Embeddings', status: 'planned' },
      { label: 'Documents', status: 'partial', note: 'CV files in Supabase Storage' },
      { label: 'Knowledge', status: 'planned' },
    ],
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics / ETL',
    subtitle: 'Snowflake · Airflow · dbt',
    status: 'planned',
    today: 'Today: market skill demand is computed in PostgreSQL.',
    items: [
      { label: 'Job Market Analytics', status: 'planned' },
      { label: 'Skill Trends', status: 'planned' },
      { label: 'Airflow orchestration', status: 'planned' },
      { label: 'dbt transformations', status: 'planned' },
    ],
  },
  providers: {
    id: 'providers',
    title: 'AI Providers',
    subtitle: 'Model layer',
    status: 'partial',
    items: [
      { label: 'Gemini', status: 'live' },
      { label: 'OpenAI', status: 'planned' },
      { label: 'Embedding Models', status: 'planned' },
    ],
  },
  observability: {
    id: 'observability',
    title: 'Observability',
    subtitle: 'OpenTelemetry · Prometheus · Grafana · Langfuse',
    status: 'planned',
    today: 'Today: structured API logging and a /health endpoint.',
    items: [
      { label: 'API Metrics', status: 'planned' },
      { label: 'Logs', status: 'partial', note: 'Structured API logs' },
      { label: 'Traces', status: 'planned' },
      { label: 'LLM Cost', status: 'planned' },
      { label: 'Latency', status: 'planned' },
      { label: 'RAG Evaluation', status: 'planned' },
      { label: 'Agent Execution', status: 'planned' },
    ],
  },
  infrastructure: {
    id: 'infrastructure',
    title: 'Infrastructure',
    subtitle: 'Target deployment pipeline',
    status: 'planned',
    today: 'Today: deployed on Vercel with a managed Supabase project.',
    items: [
      { label: 'Docker', status: 'planned' },
      { label: 'GitHub Actions', status: 'planned' },
      { label: 'AWS', status: 'planned' },
      { label: 'ECR / ECS', status: 'planned' },
      { label: 'Kubernetes / EKS', status: 'planned' },
    ],
  },
}

export interface FlowStep {
  id: string
  title: string
  body: string
  status: BuildStatus
  today?: string
}

/** Target request flow for a single career question, with today's equivalent per step. */
export const requestFlow: FlowStep[] = [
  {
    id: 'question',
    title: 'User Question',
    body: 'A candidate asks something like "Am I ready for a junior data scientist role?" from the chat or a dashboard.',
    status: 'live',
  },
  {
    id: 'agent',
    title: 'LangGraph Agent',
    body: 'A stateful agent graph decides which steps the question needs and in what order.',
    status: 'partial',
    today: 'Today: a TypeScript career agent with intent detection and persisted conversation state.',
  },
  {
    id: 'understand',
    title: 'Understand Query',
    body: 'Classify intent and extract the target role, location, and any constraints from the conversation.',
    status: 'live',
  },
  {
    id: 'profile',
    title: 'Retrieve User Profile',
    body: 'Load the structured profile — CV, education, projects, experience, skills, and preferences.',
    status: 'live',
  },
  {
    id: 'rag',
    title: 'RAG Retrieval',
    body: 'Semantic search over embedded jobs, skills, and career knowledge to pull only the most relevant context.',
    status: 'planned',
    today: 'Today: deterministic SQL queries assemble structured context blocks instead of vector search.',
  },
  {
    id: 'job-skill-data',
    title: 'Job Data + Skill Data',
    body: 'Matched job postings with required and preferred skills, plus market demand for those skills.',
    status: 'live',
  },
  {
    id: 'match',
    title: 'Match Analysis',
    body: 'Score how well the candidate fits each role with a transparent, explainable breakdown.',
    status: 'live',
  },
  {
    id: 'gap',
    title: 'Skill Gap Analysis',
    body: 'Identify missing skills and rank them by market demand and impact on readiness.',
    status: 'live',
  },
  {
    id: 'recommend',
    title: 'Career Recommendation',
    body: 'Choose a next-best-action and learning roadmap grounded in the gap analysis.',
    status: 'live',
  },
  {
    id: 'llm',
    title: 'Gemini / LLM',
    body: 'The LLM turns deterministic signals into a clear, personalised explanation — it narrates the analysis rather than inventing it.',
    status: 'live',
  },
  {
    id: 'structured',
    title: 'Structured Response',
    body: 'Responses are schema-validated (Zod) so the UI receives typed data, not free text it has to guess at.',
    status: 'live',
  },
  {
    id: 'frontend',
    title: 'Frontend',
    body: 'Streamed to the chat and rendered as job cards, readiness panels, and roadmaps.',
    status: 'live',
  },
]

export const knowledgeSources: { group: string; items: string[] }[] = [
  {
    group: 'Candidate',
    items: ['Profile data', 'CV information', 'Education', 'Projects', 'Experience', 'Certifications'],
  },
  {
    group: 'Jobs',
    items: ['Job descriptions', 'Required skills', 'Preferred skills'],
  },
  {
    group: 'Knowledge',
    items: ['Career knowledge', 'Interview knowledge', 'Learning resources'],
  },
]

export const ragPipeline: FlowStep[] = [
  { id: 'sources', title: 'Data Sources', body: 'Profiles, CVs, job postings, and career knowledge.', status: 'live' },
  { id: 'loader', title: 'Data Loader', body: 'Load and parse documents and records.', status: 'planned' },
  { id: 'chunking', title: 'Chunking', body: 'Split content into retrievable passages.', status: 'planned' },
  { id: 'embeddings', title: 'Embeddings', body: 'Encode chunks as vectors.', status: 'planned' },
  { id: 'store', title: 'PostgreSQL + pgvector', body: 'Store vectors next to relational data.', status: 'planned' },
  { id: 'retriever', title: 'Retriever', body: 'Similarity search, filtered by user and role.', status: 'planned' },
  { id: 'context', title: 'Relevant Context', body: 'Top-k passages assembled into the prompt.', status: 'planned' },
  { id: 'llm', title: 'LLM', body: 'Gemini generates a grounded answer.', status: 'live' },
]

export interface AgentWorkflow {
  id: string
  name: string
  purpose: string
  today: string
  steps: string[]
  /** Index range [from, to] of a feedback loop, drawn as "repeat" between those steps. */
  loop?: { from: number; to: number; label: string }
}

export const agentWorkflows: AgentWorkflow[] = [
  {
    id: 'career-analysis',
    name: 'Career Analysis Agent',
    purpose: 'Answers "How ready am I for this role, and what should I do next?"',
    today:
      'Today: readiness, skill-gap, and next-best-action logic runs as tested TypeScript modules behind /api/v1/ai/career-analysis.',
    steps: [
      'Load User Profile',
      'Analyze Target Role',
      'Retrieve Relevant Jobs',
      'Retrieve Skill Knowledge',
      'Compare Skills',
      'Calculate Gaps',
      'Generate Recommendation',
      'Validate Output',
    ],
  },
  {
    id: 'cv-tailoring',
    name: 'CV Tailoring Agent',
    purpose: 'Rewrites a CV for one specific job without inventing experience.',
    today:
      'Today: resume-vs-job comparison, keyword analysis, and tailoring grounded in verified candidate facts run as a single generation pass.',
    steps: [
      'Load CV',
      'Load Job Description',
      'Retrieve Relevant Skills',
      'Identify Matching Experience',
      'Identify Missing Keywords',
      'Generate Tailored CV',
      'Critique',
      'Improve',
    ],
    loop: { from: 7, to: 6, label: 'repeat until the critique passes' },
  },
  {
    id: 'interview',
    name: 'Interview Agent',
    purpose: 'Runs a realistic mock interview for a target role.',
    today:
      'Today: question generation, answer evaluation, and next-question generation are implemented as separate server steps in the Interview Coach.',
    steps: [
      'Identify Target Role',
      'Retrieve Job Requirements',
      'Retrieve Candidate Profile',
      'Generate Question',
      'User Answer',
      'Evaluate Answer',
      'Give Feedback',
      'Generate Next Question',
    ],
    loop: { from: 7, to: 4, label: 'repeat for each question' },
  },
]

export const dataArchitecture: { group: string; tables: string[] }[] = [
  {
    group: 'Candidate profile',
    tables: ['profiles', 'skills', 'profile_skills', 'education', 'experience', 'projects', 'career_preferences'],
  },
  { group: 'CV intelligence', tables: ['resumes', 'resume_versions', 'resume_analysis'] },
  {
    group: 'Jobs & ingestion',
    tables: ['jobs', 'job_skills', 'job_matches', 'saved_jobs', 'job_sources', 'job_source_runs'],
  },
  {
    group: 'Applications',
    tables: ['applications', 'application_status_history', 'application_documents', 'application_analyses', 'cover_letters'],
  },
  {
    group: 'Coaching & growth',
    tables: ['interview_sessions', 'interview_exchanges', 'learning_roadmaps', 'learning_roadmap_items'],
  },
  { group: 'Conversation', tables: ['conversations', 'messages', 'notifications'] },
]

export const roadmap: { phase: string; title: string; status: BuildStatus; items: string[] }[] = [
  {
    phase: '01',
    title: 'Product foundation',
    status: 'live',
    items: [
      'Auth, onboarding, and career profile',
      'CV parsing, analysis, and tailoring',
      'Job ingestion, matching, and skill gaps',
      'Interview coach, roadmaps, tracking, and reminders',
      'Conversational career agent',
    ],
  },
  {
    phase: '02',
    title: 'API platform',
    status: 'partial',
    items: ['Versioned /api/v1 with OpenAPI spec (live)', 'API gateway (WSO2) designed, not yet deployed'],
  },
  {
    phase: '03',
    title: 'AI services & RAG',
    status: 'planned',
    items: ['Python / FastAPI AI service', 'Embeddings + pgvector', 'LlamaIndex retrieval pipeline'],
  },
  {
    phase: '04',
    title: 'Agentic workflows',
    status: 'planned',
    items: ['LangGraph career, CV, and interview agents', 'Critique loops and output validation'],
  },
  {
    phase: '05',
    title: 'Cloud infrastructure',
    status: 'planned',
    items: ['Docker images', 'GitHub Actions CI/CD', 'AWS ECR / ECS, then EKS'],
  },
  {
    phase: '06',
    title: 'Observability & analytics',
    status: 'planned',
    items: [
      'OpenTelemetry, Prometheus, Grafana',
      'Langfuse LLM tracing, cost, and RAG evaluation',
      'Snowflake market analytics with Airflow and dbt',
    ],
  },
]

export const engineeringChallenges: { title: string; body: string }[] = [
  {
    title: 'Keeping the LLM honest',
    body: 'Tailored CVs are generated from verified candidate facts, and structured outputs are validated with Zod — the model can rephrase and prioritise experience, but not invent it.',
  },
  {
    title: 'Deterministic where it matters',
    body: 'Match scores, readiness, skill-gap priority, and roadmap construction are deterministic, tested functions. The LLM explains the result instead of being the source of it.',
  },
  {
    title: 'Messy, duplicated job data',
    body: 'Postings arrive from different sources in different shapes. The pipeline strips HTML, normalises fields, checks freshness, and de-duplicates across sources before anything is scored.',
  },
  {
    title: 'Conversation that remembers',
    body: 'The job-search agent persists structured search state and merges each new message into it, so "only remote ones" refines the last search instead of starting over.',
  },
  {
    title: 'Security by default',
    body: 'Row Level Security on every user-owned table, server-side auth checks behind the edge proxy, auth-boundary tests on the API, and URL-safety checks before fetching user-supplied job links.',
  },
]
