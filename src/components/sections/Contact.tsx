import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { profile } from '@/data/profile'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="accent" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-sm tracking-widest text-accent"
        >
          07 — Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Ready to collaborate on your next project?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-ink-muted"
        >
          I'm always interested in hearing about new opportunities, interesting projects, and ways
          to apply AI and data science to solve meaningful problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" href={`mailto:${profile.email}`}>
            <Mail size={16} /> Send Message
          </MagneticButton>
          <MagneticButton variant="secondary" href={profile.resumeUrl}>
            Download Resume
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-sm text-ink-muted"
        >
          <span className="inline-flex items-center gap-2">
            <Mail size={14} className="text-accent" /> {profile.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={14} className="text-accent" /> {profile.phone}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={14} className="text-accent" /> {profile.location}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
