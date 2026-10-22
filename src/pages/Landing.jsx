import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const features = [
  { icon: '📦', title: 'Remember', text: 'Capture the story' },
  { icon: '⏳', title: 'Reflect', text: 'Learn from the past' },
  { icon: '🔭', title: 'Revive', text: 'Give ideas a second chance' },
]

export default function Landing() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/gate-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-night/15" />
      <Navbar />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-40 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-metal text-6xl leading-tight tracking-wide text-[#ab8a77] md:text-8xl drop-shadow-[0_0_18px_rgba(171,138,119,0.4)]"
        >
          The<br />Project<br />Graveyard
        </motion.h1>

        <p className="mt-6 font-serif text-xl text-[#ab8a77] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] md:text-2xl">A resting place for unfinished ideas.</p>
        <p className="mt-4 text-[#ab8a77] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          Every idea deserves a proper rest.<br />Not dead, just sleeping.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/seance"
            className="rounded-xl border border-fern bg-night/70 px-8 py-4 font-semibold shadow-[0_0_25px_rgba(142,230,160,0.5)] transition hover:bg-moss"
          >
            ⚰️ Bury a Project
          </Link>
          <Link
            to="/graveyard"
            className="rounded-xl border border-fern/40 bg-night/50 px-8 py-4 font-semibold transition hover:border-fern hover:bg-moss"
          >
            🔭 Explore the Graveyard
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-3 gap-2 px-6 pb-8 text-center md:px-24">
        {features.map((f) => (
          <div key={f.title}>
            <div className="text-3xl">{f.icon}</div>
            <div className="mt-1 font-semibold">{f.title}</div>
            <div className="text-xs text-moon/70 md:text-sm">{f.text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}