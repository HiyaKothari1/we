import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Skull, Ghost, Sprout, RefreshCw, Hourglass, Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import { sampleProjects } from '../data/projects'
import { getProjects } from '../utils/storage'
import { CEMETERIES, MAP_SRC, MAP_ASPECT, TOMBSTONE_W, ANCHOR_Y } from '../data/cemeteries'

const statusStyle = {
  Buried: { icon: Skull, color: 'text-red-400', badge: 'bg-amber-300 text-stone-900' },
  Haunting: { icon: Ghost, color: 'text-violet-400', badge: 'bg-orange-400 text-stone-900' },
  Resurrected: { icon: Sprout, color: 'text-emerald-400', badge: 'bg-[#39ff88] text-stone-900' },
  Repurposed: { icon: RefreshCw, color: 'text-cyan-300', badge: 'bg-cyan-300 text-stone-900' },
  Archived: { icon: Hourglass, color: 'text-sky-300', badge: 'bg-violet-300 text-stone-900' },
}

/* ---------- hover preview ---------- */
function Preview({ project, below }) {
  const s = statusStyle[project.status] || statusStyle.Buried
  const progress = project.completion ?? project.progress ?? 0
  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-40 hidden w-60 -translate-x-1/2 rounded-xl border border-moon/20 bg-black/85 p-4 text-left shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm group-hover:block ${
        below ? 'top-full mt-2' : 'bottom-full mb-2'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate font-serif text-base text-stone-100">{project.name}</h3>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.badge}`}>
          {project.status}
        </span>
      </div>
      <p className="text-xs text-stone-400">{project.years}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-snug text-stone-300">{project.summary}</p>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-200">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-700/80">
          <div className="h-full rounded-full bg-amber-200/80" style={{ width: `${progress}%` }} />
        </div>
        {progress}%
      </div>
      {project.lastActive && (
        <p className="mt-1 text-[11px] text-stone-500">Last active: {project.lastActive}</p>
      )}
    </div>
  )
}

/* ---------- bhara hua cemetery ---------- */
function FilledPlot({ project, slot, isNew }) {
  const s = statusStyle[project.status] || statusStyle.Buried
  const Icon = s.icon
  const below = slot.y < 26

  return (
    // bahar ka wrapper: fixed, kabhi nahi hilta
    <div
      className="group absolute z-10 hover:z-30"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${TOMBSTONE_W}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* sirf andar ka hissa scale hota hai */}
      <motion.div
        initial={isNew ? { opacity: 0, y: 50, scale: 0.6 } : { opacity: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={isNew ? { type: 'spring', stiffness: 60, damping: 12, delay: 0.4 } : { delay: slot.id * 0.04 }}
        whileHover={{ scale: 1.25 }}
        style={{ transformOrigin: 'center center' }}
        className="relative"
      >
        {isNew && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 40px 10px ${slot.glow}` }}
            animate={{ opacity: [0.9, 0], scale: [0.6, 1.8] }}
            transition={{ duration: 1.6, repeat: 3 }}
          />
        )}

        <Link to={`/project/${project.id}`} className="block" title={project.name}>
          <div className="@container relative aspect-[1086/1448] w-full">
            <img
              src="/images/Tombstone.png"
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              style={{ filter: `drop-shadow(0 0 8px ${slot.glow})` }}
            />
            <div className="absolute inset-x-[22%] bottom-[20%] top-[40%] flex items-center justify-center">
              <Icon className={`h-[30cqw] w-[30cqw] ${s.color}`} strokeWidth={1.8} />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* naam: tombstone ke neeche, hamesha ek hi jagah */}
      <div className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2">
        <span className="whitespace-nowrap rounded-md border border-moon/20 bg-black/75 px-2 py-0.5 font-serif text-[11px] text-stone-100">
          {project.name}
        </span>
      </div>

      <Preview project={project} below={below} />
    </div>
  )
}

function EmptyPlot({ slot }) {
  return (
    <div
      className="group absolute z-10 hover:z-30"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: slot.id * 0.04 }}
        whileHover={{ scale: 1.12 }}
      >
        <Link to="/seance" className="flex flex-col items-center gap-1.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-stone-300/60 bg-black/60 text-stone-200 transition group-hover:border-emerald-300 group-hover:text-emerald-300"
            style={{ boxShadow: `0 0 14px ${slot.glow}` }}
          >
            <Plus className="h-4 w-4" />
          </span>
          <span className="whitespace-nowrap rounded-md border border-stone-400/30 bg-black/70 px-2.5 py-0.5 text-[11px] text-stone-300 transition group-hover:border-emerald-300/60 group-hover:text-emerald-200">
            Bury a project here
          </span>
        </Link>
      </motion.div>
    </div>
  )
}

/* ---------- page ---------- */
export default function MapPage() {
  const [params] = useSearchParams()
  const newId = params.get('new') // /map?new=<project id> => rise animation

  // purane se naye: naya project hamesha agle khaali cemetery mein
  const projects = [...getProjects(), ...sampleProjects]
    .filter((p) => p && p.id && p.name)
    .sort((a, b) =>
      (a.buriedAt || a.createdAt || '').localeCompare(b.buriedAt || b.createdAt || '')
    )

  const shown = projects.slice(0, CEMETERIES.length)
  const extra = projects.length - shown.length

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative mx-auto w-full max-w-[2200px]" style={{ aspectRatio: MAP_ASPECT }}>
        <img
          src={MAP_SRC}
          alt="The Project Graveyard map"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none"
        />

        {CEMETERIES.map((c) => (
            <span
                key={`dbg-${c.id}`}
                className="pointer-events-none absolute z-50 h-2 w-2 rounded-full bg-red-500"
                style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
            />
        ))}

        {extra > 0 && (
          <Link
            to="/graveyard"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-moon/30 bg-black/75 px-5 py-2 text-sm text-stone-200 transition hover:border-emerald-300"
          >
            +{extra} more {extra === 1 ? 'project' : 'projects'} in the Graveyard
          </Link>
        )}
      </div>
    </div>
  )
}