import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TombstoneCard from '../components/TombstoneCard'
import { sampleProjects, statuses } from '../data/projects'

export default function Graveyard() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('recent')

  const projects = sampleProjects
    .filter((p) => filter === 'All' || p.status === filter)
    .filter((p) =>
      (p.name + p.summary + p.tags.join(' ')).toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'recent'
        ? b.buriedAt.localeCompare(a.buriedAt)
        : a.name.localeCompare(b.name)
    )

  const count = (s) => sampleProjects.filter((p) => p.status === s).length

  return (
    <div className="min-h-screen bg-night">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, tags, or keywords..."
            className="flex-1 rounded-xl border border-fern/30 bg-moss/60 px-5 py-3 outline-none focus:border-fern"
          />
          <Link
            to="/seance"
            className="rounded-xl bg-fern/90 px-6 py-3 text-center font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.4)]"
          >
            + Bury a Project
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {['All', ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                filter === s
                  ? 'border-fern bg-fern/30 text-fern'
                  : 'border-fern/30 text-moon/80 hover:border-fern'
              }`}
            >
              {s} ({s === 'All' ? sampleProjects.length : count(s)})
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-auto rounded-lg border border-fern/30 bg-moss px-3 py-2 text-sm"
          >
            <option value="recent">Sort: Last updated</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {projects.length === 0 ? (
          <p className="mt-16 text-center text-moon/60">No graves found. Try another search.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <TombstoneCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}