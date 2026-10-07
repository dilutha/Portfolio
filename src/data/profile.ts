export const profile = {
  name: 'Dilutha Weerasinghe',
  initials: 'DW',
  roles: ['AI Engineer', 'Data Scientist', 'Generative AI Engineer', 'Full-Stack Developer', 'Business Information Systems'],
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
    'Currently pursuing my MSc in Applied Artificial Intelligence at the University of Westminster while maintaining a 3.90 GPA in my Business Information Systems degree. My work spans an AI career-intelligence platform, agentic AI shopping assistants, explainable ML for public-health decision support, and full-stack platforms optimizing agricultural markets and hackathon operations.',
    "When I'm not training models or writing code, I'm leading the Student Association of IT at my university, organizing hackathons, and building the platforms that run them.",
  ],
  stats: [
    { value: 8, suffix: '', label: 'Case-study projects' },
    { value: 3, suffix: '', label: 'Degrees' },
    { value: 2, suffix: '', label: 'Live platforms in production' },
  ],
} as const

export interface TimelineEntry {
  id: string
  kind: 'education' | 'certification' | 'self-directed'
  title: string
  /** Institution, credential issuer, or "Self-directed". */
  place: string
  period?: string
  detail?: string
  /** Short "·"-separated skill/focus line. */
  focus?: string
  /** Primary credential/verification link ("View Credential"). */
  link?: string
  /** Additional supporting links, e.g. an individual course certificate. */
  extraLinks?: { label: string; href: string }[]
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
    detail: 'GPA: 3.90 · President, Student Association of IT (2026)',
  },
  {
    id: 'bsc-ds',
    kind: 'education',
    title: 'BSc (Hons) Data Science',
    place: 'Cardiff Metropolitan University',
    period: '2021 — 2024',
    detail: 'Second Class Upper Division',
    focus: 'Python · Regression · Statistics · ML',
  },
]

/** Formal, externally issued credentials only. */
export const certifications: TimelineEntry[] = [
  {
    id: 'cert-google-advanced-data-analytics',
    kind: 'certification',
    title: 'Google Advanced Data Analytics',
    place: 'Coursera',
    link: 'https://www.coursera.org/account/accomplishments/specialization/JU6E2XHSX3A3',
    extraLinks: [
      {
        label: 'View Certificate',
        href: 'https://www.coursera.org/account/accomplishments/certificate/CJ2B4LDTA6UX',
      },
    ],
  },
  {
    id: 'cert-apnic-cybersecurity',
    kind: 'certification',
    title: 'Cybersecurity Fundamentals',
    place: 'APNIC',
  },
  {
    id: 'cert-cisco-iot',
    kind: 'certification',
    title: 'Introduction to IoT',
    place: 'Cisco',
    link: 'https://www.credly.com/badges/e7437055-d633-44d2-979a-7abac7a49554/linked_in_profile',
  },
  {
    id: 'cert-google-statistics',
    kind: 'certification',
    title: 'The Power of Statistics',
    place: 'Google',
    link: 'https://www.coursera.org/account/accomplishments/verify/UGADULN8CA7S',
  },
]

/** Skills built through independent engineering and project work — not certifications. */
export const selfDirectedLearning: TimelineEntry[] = [
  {
    id: 'self-devops',
    kind: 'self-directed',
    title: 'DevOps Engineer',
    place: 'Self-directed',
    focus: 'AWS · CI/CD · Docker · GitHub Actions',
  },
  {
    id: 'self-fullstack',
    kind: 'self-directed',
    title: 'Full-Stack Developer',
    place: 'Self-directed',
    focus: 'MERN · Next.js · Laravel · HTML/CSS/JS',
  },
  {
    id: 'self-flutter',
    kind: 'self-directed',
    title: 'Flutter Developer',
    place: 'Self-directed',
    focus: 'Mobile apps with ML & Gen-AI integration',
  },
]
