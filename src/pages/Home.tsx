import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { EducationSection } from '@/components/sections/EducationSection'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Volunteer } from '@/components/sections/Volunteer'
import { Leadership } from '@/components/sections/Leadership'
import { Contact } from '@/components/sections/Contact'
import { scrollToId } from '@/lib/scroll'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    requestAnimationFrame(() => scrollToId(id))
  }, [location.hash])

  return (
    <PageTransition>
      <Hero />
      <About />
      <EducationSection />
      <Skills />
      <Projects />
      <Volunteer />
      <Leadership />
      <Contact />
    </PageTransition>
  )
}
