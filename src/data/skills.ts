export interface SkillCategory {
  id: string
  title: string
  description: string
  /** Demonstrated in shipped projects, coursework, or credentials. */
  skills: string[]
  /** Actively learning / part of a target architecture — not yet demonstrated in a shipped project. */
  learning?: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Model development, generative AI, agents, and explainability.',
    skills: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Generative AI',
      'LLMs',
      'AI Agents',
      'Gemini',
      'LangGraph',
      'LangChain',
      'TensorFlow',
      'Keras',
      'PyTorch',
      'Scikit-learn',
      'XGBoost',
      'LightGBM',
      'Prophet',
      'SHAP',
    ],
    learning: ['RAG', 'LlamaIndex'],
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description: 'Statistics, analysis, pipelines, and communicating with data.',
    skills: [
      'Python',
      'Pandas',
      'NumPy',
      'SQL',
      'Statistics',
      'Data Analysis',
      'Power BI',
      'Data Visualization',
      'Streamlit',
      'ETL / ELT',
      'Data Pipelines',
    ],
    learning: ['Airflow', 'dbt', 'Snowflake'],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description: 'Interfaces, APIs, and application logic.',
    skills: [
      'TypeScript',
      'JavaScript',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'HTML',
      'CSS',
      'FastAPI',
      'NestJS',
      'Node.js',
      'Laravel',
      'PHP',
      'Spring Boot',
      'Flutter',
    ],
  },
  {
    id: 'databases-backend',
    title: 'Databases / Backend',
    description: 'Relational data, auth, caching, and API design.',
    skills: ['PostgreSQL', 'Supabase', 'MySQL', 'Prisma', 'Redis', 'REST APIs'],
    learning: ['pgvector'],
  },
  {
    id: 'cloud-devops',
    title: 'DevOps / Cloud',
    description: 'Shipping and operating what gets built.',
    skills: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'CI/CD', 'AWS', 'Vercel'],
  },
  {
    id: 'ui-ux',
    title: 'UI / UX',
    description: 'Research-led, prototype-first interface design.',
    skills: ['Figma', 'UX Design', 'Prototyping', 'User Flows', 'Wireframing', 'Information Architecture'],
  },
]
