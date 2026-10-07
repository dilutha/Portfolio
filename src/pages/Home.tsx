import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { PortraitStage } from '@/components/sections/PortraitStage'
import { EducationSection } from '@/components/sections/EducationSection'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Volunteer } from '@/components/sections/Volunteer'
import { Leadership } from '@/components/sections/Leadership'
import { Contact } from '@/components/sections/Contact'
import { scrollToId } from '@/lib/scroll'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  const location = useLocation()

  usePageMeta({
    title: 'Dilutha Weerasinghe | AI Engineer & Data Scientist',
    description:
      'Dilutha Weerasinghe is an AI engineer and data scientist working across artificial intelligence, generative AI, data science, software engineering, and business information systems. Explore case studies including CareerLense AI.',
    path: '/',
  })

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    requestAnimationFrame(() => scrollToId(id))
  }, [location.hash])

  return (
    <PageTransition>
      <PortraitStage />
      <EducationSection />
      <Skills />
      <Projects />
      <Volunteer />
      <Leadership />
      <Contact />
    </PageTransition>
  )
}
