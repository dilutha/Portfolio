export interface LeadershipEntry {
  id: string
  role: string
  organization: string
  period: string
  description: string
}

export const leadershipEntries: LeadershipEntry[] = [
  {
    id: 'usj-it-association-president',
    role: 'President',
    organization: 'Student Association of Information Technology, University of Sri Jayewardenepura (USJ)',
    period: '2026',
    description:
      'Leading the student body representing the Information Technology stream at USJ — organizing academic, professional-development, and community initiatives for IT students.',
  },
  {
    id: 'sjc-wattala-senior-prefect',
    role: 'Senior Prefect',
    organization: "St. Joseph's College, Wattala",
    period: 'School Leadership',
    description:
      'Held a senior student-leadership position within the school prefect body, taking on responsibility and representing fellow students during secondary education.',
  },
]
