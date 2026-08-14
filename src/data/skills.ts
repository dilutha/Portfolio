export interface SkillCategory {
  id: string
  title: string
  description: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Model development, agentic systems, and explainability.',
    skills: [
      'Python',
      'TensorFlow',
      'Keras',
      'PyTorch',
      'scikit-learn',
      'XGBoost',
      'LightGBM',
      'Prophet',
      'SHAP',
      'LangChain',
      'LangGraph',
      'Google Gemini API',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interactive, component-driven interfaces.',
    skills: ['React', 'Next.js', 'TypeScript', 'Flutter', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs, services, and application logic.',
    skills: ['NestJS', 'Laravel', 'Flask', 'FastAPI', 'Spring Boot', 'Node.js'],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational data, caching, and real-time state.',
    skills: ['PostgreSQL', 'Supabase', 'Prisma', 'Redis', 'SQL'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Shipping and operating what gets built.',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Vercel'],
  },
  {
    id: 'tools',
    title: 'Data & Tools',
    description: 'Analysis, visualization, and day-to-day workflow.',
    skills: ['Power BI', 'Streamlit', 'Pandas', 'NumPy', 'Git', 'Figma'],
  },
]
