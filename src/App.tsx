import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CursorFollower } from '@/components/layout/CursorFollower'
import { LoadingScreen } from '@/components/ui/LoadingScreen'

const Home = lazy(() => import('@/pages/Home'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const VolunteerDetail = lazy(() => import('@/pages/VolunteerDetail'))

function App() {
  const location = useLocation()

  return (
    <>
      <LoadingScreen />
      <CursorFollower />
      <Navbar />
      <Suspense fallback={null}>
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/volunteer/:id" element={<VolunteerDetail />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
