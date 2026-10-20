import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const statusStyle = {
  Buried: 'bg-lantern/20 text-lantern border-lantern/50',
  Haunting: 'bg-orange-500/20 text-orange-300 border-orange-400/50',
  Resurrected: 'bg-fern/20 text-fern border-fern/50',
  Repurposed: 'bg-sky-400/20 text-sky-300 border-sky-300/50',
  Archived: 'bg-slate-400/20 text-slate-300 border-slate-300/50',
}

export default function TombstoneCard({ project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link
        to={`/project/${project.id}`}
        className="block rounded-t-[80px] rounded-b-xl border border-fern/20 bg-moss/80 px-5 pb-6 pt-8 text-center shadow-[0_0_25px_rgba(142,230,160,0.12)] transition hover:border-fern/60 hover:shadow-[0_0_35px_rgba(142,230,160,0.35)]"
      >
        <span
          className={`inline-block rounded-md border px-3 py-1 text-xs font-semibold ${statusStyle[project.status]}`}
        >
          {project.status}
        </span>

        <div className="mt-5 text-5xl">{project.icon}</div>
        <h3 className="mt-3 font-serif text-2xl">{project.name}</h3>
        <p className="text-sm text-moon/60">{project.years}</p>
        <p className="mt-3 min-h-[40px] text-sm text-moon/80">{project.summary}</p>

        <div className="mt-4 flex items-center gap-2 text-xs">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-night">
            <div className="h-full rounded-full bg-fern" style={{ width: `${project.progress}%` }} />
          </div>
          <span>{project.progress}%</span>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-fern/30 px-3 py-1 text-xs text-moon/80">
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}