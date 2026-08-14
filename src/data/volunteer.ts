export interface VolunteerEntry {
  id: string
  role: string
  organization: string
  period: string
  description: string
  responsibilities: string[]
  techStack: string[]
  links: { live?: string; github?: string }
}

export const volunteerEntries: VolunteerEntry[] = [
  {
    id: 'dhack-judge-portal',
    role: 'Lead Developer',
    organization: 'DHACK Judging Portal',
    period: '2026',
    description:
      'Designed, developed, deployed, and maintained the complete online judging platform for DHACK end-to-end — from architecture through production.',
    responsibilities: [
      'Architected the full-stack app on Next.js Server Actions with Supabase (Postgres, Auth, RLS) as the backend',
      'Built username-based judge/admin authentication resolved to Supabase Auth via a SECURITY DEFINER function',
      'Modeled the judging workflow at the database level: evaluation locking enforced by RLS, auto-computed and cached leaderboard scores via Postgres triggers',
      'Built the admin suite: judges, panels, rubric criteria, submissions (with CSV import), and a leaderboard with CSV/Excel export',
      'Deployed and operated the platform on Vercel with Supabase-managed migrations',
    ],
    techStack: ['Next.js 16', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    links: {
      live: 'https://judge.dhack.online',
      github: 'https://github.com/dilutha/dhack-judge',
    },
  },
  {
    id: 'dhack-2026-website',
    role: 'Volunteer Developer',
    organization: 'DHACK 2026 Website',
    period: '2026',
    description:
      'Contributed to rebuilding the official DHACK 2026 competition website — the marketing site and registration platform for a Sri Lankan AI innovation hackathon.',
    responsibilities: [
      'Contributed to the Next.js marketing site covering three competition tracks (Inter-University, InterSchool, ReBrand)',
      'Worked within a stack combining Framer Motion, GSAP, React Three Fiber, and Lenis for the site’s interactive sections',
      'Supported the Supabase-backed registration and multi-round submission system',
    ],
    techStack: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'React Three Fiber', 'Supabase'],
    links: {
      live: 'https://dhack.lk',
      github: 'https://github.com/dilutha/Dhack-26',
    },
  },
]
