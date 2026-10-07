/**
 * Leadership experience content (route: /leadership/:id).
 * Only facts supplied by Dilutha or already published elsewhere in this
 * portfolio (see data/volunteer.ts) — no invented figures, dates, or roles.
 */
import sparshaImage from '@/assets/leadership/sparsha-2026.webp'
import dhackImage from '@/assets/leadership/dhack-26.webp'

export const leadershipRole = {
  role: 'President',
  organization: 'Student Association of Information Technology',
  institution: 'University of Sri Jayewardenepura',
  period: '2026',
}

export const sparsha = {
  id: 'sparsha-2026',
  tabLabel: 'Sparsha 2026',
  title: 'Sparsha 2026 — Successfully Done!',
  emoji: '🎭',
  image: {
    src: sparshaImage,
    width: 1536,
    height: 1024,
    alt: 'Sparsha 2026 collage: performers singing and dancing on stage, a band in front of the illuminated Sparsha logo screen, fireworks, and the crowd at the live concert',
  },
  role: 'President, Student Association of Information Technology, University of Sri Jayewardenepura',
  summary:
    'Sparsha 2026 brought together a talent show and a live concert, creating an unforgettable experience for everyone involved.',
  responsibilities: [
    'Planning and organizing the event as President of the association',
    'Leading under pressure and making quick decisions',
    'Managing responsibilities as President of the association',
    'Performing on stage as part of the event itself',
  ],
  highlights: [
    { title: 'Talent show', body: 'One half of the Sparsha 2026 programme.' },
    { title: 'Live concert', body: 'Brought together with the talent show in one event.' },
    { title: 'Organizer & performer', body: 'Part of both the organizing team and the performance.' },
  ],
  reflection: [
    'Proud to have successfully completed Sparsha 2026 as the President of the Student Association of Information Technology, University of Sri Jayewardenepura (USJ).',
    'From planning and organizing to performing on stage, this journey challenged us to lead under pressure, make quick decisions, manage responsibilities, and work together as a team.',
    'Sparsha 2026 brought together a talent show and a live concert, creating an unforgettable experience for everyone involved.',
    'Being part of both the organizing team and the performance made this event even more meaningful.',
    'What started as an idea became a reality through countless hours of teamwork, dedication, and commitment.',
    'A huge thank you to everyone who contributed, supported, performed, coordinated, and worked behind the scenes to make Sparsha 2026 a success.',
  ],
  teamwork:
    'What started as an idea became a reality through countless hours of teamwork, dedication, and commitment — with contributors, supporters, performers, coordinators, and people working behind the scenes.',
  outcome: 'Successfully completed — an idea that became a reality.',
}

export const dhack = {
  id: 'dhack-26',
  tabLabel: "DHACK'26",
  title: "DHACK'26",
  subtitle: 'The Ultimate Designathon Challenge',
  image: {
    src: dhackImage,
    width: 1000,
    height: 1000,
    alt: "DHACK'26 participants, judges, and organizers gathered in front of the University of Sri Jayewardenepura board, under the banner 'The Ultimate Designathon Challenge — Successfully Concluded'",
  },
  role: 'President — Student Association of Information Technology',
  roleDetail: 'Led DHACK\'26 as President of the Student Association of Information Technology, University of Sri Jayewardenepura.',
  organizer: ['Department of Information Technology', 'University of Sri Jayewardenepura', 'Nugegoda, Sri Lanka'],
  overview:
    "DHACK'26 was designed as a multi-category AI innovation challenge where participants created sustainable, human-centered digital solutions — open to university teams, school students, and ReBrand participants.",
  mission:
    'To cultivate a culture of innovation among school students and university participants by empowering them to solve real-world challenges through creativity, collaboration, and human-centered design.',
  focus: [
    'AI-assisted digital solutions',
    'Sustainability',
    'Human-centered design',
    'Creativity',
    'Collaboration',
    'Innovation',
  ],
  tracks: [
    {
      id: 'inter-university',
      name: 'Inter-University — Innovation',
      audience: 'Undergraduate teams from recognized universities',
      icon: 'university' as const,
      requirements: ['Exactly 3 members', 'University, faculty, degree program, and student ID'],
    },
    {
      id: 'interschool',
      name: 'InterSchool — Innovation',
      audience: 'School-level innovation track',
      icon: 'school' as const,
      requirements: [
        'Exactly 5 members',
        'School students',
        'Teacher guidance',
        'Parent / guardian contact details',
        'One team per school',
      ],
    },
    {
      id: 'rebrand',
      name: 'ReBrand Hackathon',
      audience: 'Faculty-exclusive brand and UI/UX challenge for FMSC students at the University of Sri Jayewardenepura',
      icon: 'rebrand' as const,
      requirements: [
        'Exactly 5 FMSC students',
        '3 Business Information Systems students',
        '2 members from other FMSC departments',
      ],
    },
  ],
  workshops: [
    {
      title: 'Design Thinking for Impact',
      body: 'Frame real-world problems with empathy, research, and SDGs.',
    },
    {
      title: 'AI-Enabled Product Strategy',
      body: 'Turn AI capabilities into usable, responsible digital products.',
    },
    {
      title: 'UI Systems and Prototyping',
      body: 'Create polished interfaces, design systems, and prototypes.',
    },
    {
      title: 'UX Validation',
      body: 'Test concepts, improve flows, and present user-centered evidence.',
    },
  ],
  /** Contributions already documented in this portfolio (data/volunteer.ts). */
  /** Leadership themes of the President role, as described by Dilutha. */
  leadershipThemes: [
    'Event leadership',
    'Coordination',
    'Decision-making',
    'Collaboration',
    'Managing responsibilities',
    'Supporting innovation',
    'Leading the association',
  ],
  /** Hands-on technical contributions already documented in this portfolio (data/volunteer.ts). */
  contributions: [
    {
      title: 'Lead Developer — DHACK Judging Portal',
      body: 'Designed, developed, deployed, and maintained the complete online judging platform end-to-end: judge and admin authentication, panels, rubric criteria, submissions with CSV import, and an auto-computed leaderboard with CSV/Excel export.',
      skills: ['Next.js', 'Supabase', 'PostgreSQL'],
      link: { label: 'Judging portal', href: 'https://judge.dhack.online' },
      detailPath: '/volunteer/dhack-judge-portal',
    },
    {
      title: 'Volunteer Developer — DHACK 2026 Website',
      body: 'Contributed to rebuilding the official competition website covering the three tracks, and supported the Supabase-backed registration and multi-round submission system.',
      skills: ['Next.js', 'Supabase', 'Design'],
      link: { label: 'dhack.lk', href: 'https://dhack.lk' },
      detailPath: '/volunteer/dhack-2026-website',
    },
  ],
  links: {
    facebook: 'https://www.facebook.com/share/1FGGHtX9Wv/?mibextid=wwXIfr',
    website: 'https://dhack.lk',
  },
}
