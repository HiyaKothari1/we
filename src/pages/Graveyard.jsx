import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TombstoneCard from '../components/TombstoneCard'
import { sampleProjects, statuses } from '../data/projects'
import { getProjects } from '../utils/storage'

export default function Graveyard() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('recent')
  const [year, setYear] = useState('All')
  const [allProjects] = useState(() => [...getProjects(), ...sampleProjects])

  const years = [
    ...new Set(
      allProjects.map((p) => (p.buriedAt || '').slice(0, 4)).filter(Boolean)
    ),
  ]
    .sort()
    .reverse()

  const projects = allProjects
    .filter((p) => filter === 'All' || p.status === filter)
    .filter((p) => year === 'All' || (p.buriedAt || '').startsWith(year))
    .filter((p) =>
      `${p.name || ''} ${p.summary || ''} ${(p.tags || []).join(' ')}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'recent'
        ? (b.buriedAt || '').localeCompare(a.buriedAt || '')
        : (a.name || '').localeCompare(b.name || '')
    )

  const count = (s) => allProjects.filter((p) => p.status === s).length

  return (
    <div
      className="min-h-screen bg-night bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5,10,8,0.45), rgba(5,10,8,0.7)), url('/images/graveyard-bg.png')",
      }}
    >
      <Navbar />
      <main className="mx-auto max-w-[1500px] px-6 pb-20 pt-28">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="font-serif text-6xl text-stone-100 [text-shadow:0_0_30px_rgba(160,255,200,0.25)] md:text-7xl">
              Graveyard
            </h1>
            <p className="mt-2 font-serif text-xl text-stone-300">
              Where unfinished ideas rest... for now.
            </p>
          </div>
          <Link
            to="/seance"
            className="rounded-lg border-2 border-emerald-400/70 bg-emerald-950/70 px-8 py-4 font-serif text-xl text-stone-100 shadow-[0_0_25px_rgba(52,211,153,0.35)] transition hover:shadow-[0_0_40px_rgba(52,211,153,0.6)]"
          >
            Bury a Project
          </Link>
        </div>

        {/* search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, tags, or keywords..."
          className="mt-8 w-full rounded-xl border border-stone-500/40 bg-black/50 px-6 py-4 text-stone-100 outline-none backdrop-blur-sm placeholder:text-stone-400 focus:border-emerald-400/70 md:w-[70%]"
        />

        {/* filters */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {['All', ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg border px-5 py-2 text-sm backdrop-blur-sm transition ${
                filter === s
                  ? 'border-emerald-300 bg-emerald-400/40 text-white shadow-[0_0_18px_rgba(52,211,153,0.5)]'
                  : 'border-stone-500/50 bg-black/50 text-stone-200 hover:border-emerald-400/60'
              }`}
            >
              {s} ({s === 'All' ? allProjects.length : count(s)})
            </button>
          ))}

          <div className="ml-auto flex gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-stone-500/50 bg-black/60 px-4 py-2 text-sm text-stone-200 outline-none"
            >
              <option className="bg-stone-900" value="recent">Sort: Last updated</option>
              <option className="bg-stone-900" value="name">Sort: Name</option>
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-lg border border-stone-500/50 bg-black/60 px-4 py-2 text-sm text-stone-200 outline-none"
            >
              <option className="bg-stone-900" value="All">Year</option>
              {years.map((y) => (
                <option className="bg-stone-900" key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* cards */}
        {projects.length === 0 ? (
          <p className="mt-16 text-center text-stone-300">No graves found. Try another search.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <TombstoneCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}