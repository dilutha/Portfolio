export type LeadershipCategory = 'leadership' | 'extra-curricular'

export interface LeadershipEntry {
  id: string
  category: LeadershipCategory
  role: string
  organization?: string
  period?: string
  description?: string
  /** Route of the detailed leadership experience (Sparsha 2026, DHACK'26). */
  experiencePath?: string
  /** Creative work: title in its original script and an English rendering. */
  work?: {
    title: string
    lang: string
    englishTitle: string
    genre: string
    status: { label: string; detail: string }
  }
}

export const leadershipEntries: LeadershipEntry[] = [
  {
    id: 'usj-it-association-president',
    category: 'leadership',
    role: 'President',
    organization: 'Student Association of Information Technology, University of Sri Jayewardenepura (USJ)',
    period: '2026',
    description:
      'Leading the student body representing the Information Technology stream at USJ — organizing academic, professional-development, and community initiatives for IT students.',
    experiencePath: '/leadership/usj-it-association-president',
  },
  {
    id: 'sjc-wattala-senior-prefect',
    category: 'leadership',
    role: 'Senior Prefect',
    organization: "St. Joseph's College, Wattala",
    period: 'School Leadership',
    description:
      'Held a senior student-leadership position within the school prefect body, taking on responsibility and representing fellow students during secondary education.',
  },
  {
    id: 'author-cape-leadwort',
    category: 'extra-curricular',
    role: 'Author',
    description: 'A Sinhala novel centered around romance — a creative writing project currently in progress.',
    work: {
      title: 'කෙප් ලිඩ්වර්ට්',
      lang: 'si',
      englishTitle: 'Cape Leadwort',
      genre: 'Sinhala romance novel',
      status: { label: 'In Progress', detail: 'Final touchups and proofreading' },
    },
  },
]
