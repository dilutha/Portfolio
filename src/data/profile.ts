export const profile = {
  name: 'Dilutha Weerasinghe',
  initials: 'DW',
  roles: ['AI Engineer', 'Full-Stack Developer', 'Data Scientist', 'Business Information Systems'],
  location: 'Wattala, Sri Lanka',
  email: 'diluthaweerasingha@gmail.com',
  phone: '+94 70 2512828',
  social: {
    github: 'https://github.com/dilutha',
    linkedin: 'https://www.linkedin.com/in/dilutha-weerasingha-a1568b177',
  },
  resumeUrl: '/assets/resume/Resume-Dilutha-Weerasinghe.pdf',
  heroHeadline: 'Building intelligent systems that drive real-world impact.',
  heroSubtext:
    'Specializing in agentic AI, explainable machine learning, and full-stack development. Currently pursuing an MSc in Applied AI while shipping data-driven, production-shaped systems for real problems.',
  bio: [
    "I'm an AI engineer and data scientist passionate about transforming complex data into actionable insights and building intelligent systems that solve real-world challenges.",
    'Currently pursuing my MSc in Applied Artificial Intelligence at the University of Westminster while maintaining a 3.92 GPA in my Business Information Systems degree. My work spans agentic AI shopping assistants, explainable ML for public-health decision support, and full-stack platforms optimizing agricultural markets and hackathon operations.',
    "When I'm not training models or writing code, I'm leading the Student Association of IT at my university, organizing hackathons, and building the platforms that run them.",
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Case-study projects' },
    { value: 3, suffix: '', label: 'Degrees' },
    { value: 2, suffix: '', label: 'Live platforms in production' },
  ],
} as const

export interface TimelineEntry {
  id: string
  kind: 'education' | 'certification'
  title: string
  place: string
  period: string
  detail?: string
  link?: string
}

export const educationTimeline: TimelineEntry[] = [
  {
    id: 'msc-ai',
    kind: 'education',
    title: 'MSc Applied Artificial Intelligence',
    place: 'University of Westminster (Informatics Institute of Technology, Sri Lanka)',
    period: '2026 — Present',
    detail: 'Among the first cohorts of this Applied AI Master’s program delivered in Sri Lanka.',
  },
  {
    id: 'bsc-bis',
    kind: 'education',
    title: 'BSc (Hons) Business Information Systems',
    place: 'University of Sri Jayewardenepura',
    period: '2023 — Present',
    detail: 'GPA: 3.92 · President, Student Association of IT (2026)',
  },
  {
    id: 'bsc-ds',
    kind: 'education',
    title: 'BSc (Hons) Data Science',
    place: 'Cardiff Metropolitan University',
    period: '2021 — 2024',
    detail: 'Second Class Upper Division',
  },
]

export const certifications: TimelineEntry[] = [
  {
    id: 'cert-analytics',
    kind: 'certification',
    title: 'Google Advanced Data Analytics',
    place: 'Coursera',
    period: 'Python · Regression · Statistics · ML',
    link: 'https://www.coursera.org/account/accomplishments/specialization/JU6E2XHSX3A3',
  },
  {
    id: 'cert-devops',
    kind: 'certification',
    title: 'DevOps Engineer',
    place: 'Self-directed',
    period: 'AWS · CI/CD · Docker · GitHub Actions',
  },
  {
    id: 'cert-fullstack',
    kind: 'certification',
    title: 'Full-Stack Developer',
    place: 'Self-directed',
    period: 'MERN · Next.js · Laravel · HTML/CSS/JS',
  },
  {
    id: 'cert-flutter',
    kind: 'certification',
    title: 'Flutter Developer',
    place: 'Self-directed',
    period: 'Mobile apps with ML & Gen-AI integration',
  },
]
