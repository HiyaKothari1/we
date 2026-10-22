import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Pencil, Compass, BookOpen, Skull, Clock, FileText, Info, Lock,
  ExternalLink, Zap, Trash2, Archive, Save, HeartCrack, Search, ListChecks,
  Download, Users, Code2, Sprout, Link2,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { sampleProjects } from '../data/projects'
import { getProjects } from '../utils/storage'


const badgeClass = {
  Buried: 'bg-amber-300 text-stone-900 shadow-[0_0_16px_rgba(252,211,77,0.6)]',
  Haunting: 'bg-orange-400 text-stone-900 shadow-[0_0_16px_rgba(251,146,60,0.6)]',
  Resurrected: 'bg-[#39ff88] text-stone-900 shadow-[0_0_16px_rgba(57,255,136,0.6)]',
  Repurposed: 'bg-cyan-300 text-stone-900 shadow-[0_0_16px_rgba(103,232,249,0.6)]',
  Archived: 'bg-violet-300 text-stone-900 shadow-[0_0_16px_rgba(196,181,253,0.6)]',
}

const tabs = [
  { key: 'overview', label: 'Overview', icon: BookOpen },
  { key: 'autopsy', label: 'Autopsy', icon: Skull },
  { key: 'timeline', label: 'Timeline', icon: Clock },
  { key: 'notes', label: 'Notes', icon: FileText },
]

const reasonIcons = [Clock, Code2, Users]
const featureIcons = [Search, ListChecks, Download, Users]

const techColors = {
  HTML: 'border-orange-500 text-orange-400',
  CSS: 'border-blue-500 text-blue-400',
  JavaScript: 'border-yellow-400 text-yellow-300',
  'Node.js': 'border-green-500 text-green-400',
  MongoDB: 'border-emerald-400 text-emerald-300',
  React: 'border-cyan-400 text-cyan-300',
}
// box.png ke hisaab se adjust karna:
// FRAME_SLICE = image mein border kitne px moti hai (original image ke pixels mein)
// FRAME_WIDTH = screen par wo border kitne px moti dikhe
// Frame
const FRAME_SLICE = 160   // box.png mein border kitni moti hai (image px)
const FRAME_WIDTH = 40    // screen par border ki motai

// Frame ke andar content ke liye jagah (isi se centering tune hoti hai)
const PAD_TOP = 28        // upar skull/vines hain to zyada
const PAD_X = 20
const PAD_BOTTOM = 16

function Panel({ className = '', children }) {
  return (
    <section
      className={`relative min-w-0 ${className}`}
      style={{
        borderStyle: 'solid',
        borderWidth: `${FRAME_WIDTH}px`,
        borderImageSource: "url('/images/box.png')",
        borderImageSlice: `${FRAME_SLICE} fill`,
        borderImageWidth: `${FRAME_WIDTH}px`,
        borderImageRepeat: 'stretch',
        padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOTTOM}px`,
      }}
    >
      {children}
    </section>
  )
}

function PanelTitle({ icon: Icon, children, iconClass = 'text-moon' }) {
  return (
    <h2 className="mb-3 flex items-center gap-2.5 font-serif text-xl">
      <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} />
      {children}
    </h2>
  )
}

function Progress({ value }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full border border-moon/30 bg-black/60">
      <div
        className="h-full rounded-full bg-fern shadow-[0_0_10px_rgba(142,230,160,0.8)]"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[90px_1fr] items-center gap-3">
      <dt className="text-moon/80">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

function ActionBtn({ icon: Icon, children, danger }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
        danger
          ? 'border-red-500/40 bg-red-950/20 text-red-400 hover:border-red-400'
          : 'border-moon/15 bg-black/40 hover:border-fern/60'
      }`}
    >
      <Icon className="h-4 w-4" /> {children}
    </button>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = [...getProjects(), ...sampleProjects].find((p) => p && p.id === id)

  const [tab, setTab] = useState('overview')
  const [mood, setMood] = useState('Still excites me')
  const [note, setNote] = useState('')

  if (!project) {
    return (
      <div className="min-h-screen bg-night p-10 text-moon">
        <p>Project not found</p>
        <Link to="/graveyard" className="underline">Back to Graveyard</Link>
      </div>
    )
  }

  const tags = project.tags || []
  const completion = project.completion ?? project.progress ?? 0
  const reasons = project.reasons || []
  const features = project.features || []
  const stack = project.techStack || []

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed text-moon"
      style={{ backgroundImage: "url('/images/project-detail.png')" }}
    >
      <div className="min-h-screen bg-night/30">
        <Navbar />

        <main className="mx-auto max-w-[1400px] px-10 pb-24 pt-24">
          <div className="flex items-center justify-between">
            <Link
              to="/graveyard"
              className="inline-flex items-center gap-2 rounded-lg border border-moon/30 bg-black/60 px-4 py-2 text-sm transition hover:border-fern"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Graveyard
            </Link>

            <button className="inline-flex items-center gap-2 rounded-lg border border-moon/30 bg-black/60 px-5 py-2 text-sm transition hover:border-fern">
              <Pencil className="h-4 w-4" /> Edit
            </button>
          </div>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_340px]">
            {/* ============ LEFT ============ */}
            <div className="min-w-0">
              {/* Header */}
              <section className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
                {/* Tombstone */}
                <div className="relative h-56 w-44 shrink-0">
                  <img src="/images/Tombstone.png" alt="" className="h-full w-full object-contain" />
                  <Sprout
                    strokeWidth={1.5}
                    className="absolute left-1/2 top-[40%] h-16 w-16 -translate-x-1/2 text-fern drop-shadow-[0_0_10px_rgba(142,230,160,0.8)]"
                  />
                </div>

                {/* Title block */}
                <div className="flex-1">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold ${
                      badgeClass[project.status] || badgeClass.Buried
                    }`}
                  >
                    ⚰ {project.status}
                  </span>
                  <h1 className="mt-2 font-serif text-5xl md:text-6xl">{project.name}</h1>
                  <p className="mt-1 text-xl">{project.years}</p>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-moon/90">
                    {project.vision || project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="rounded-full border border-moon/30 bg-black/50 px-4 py-1 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Memorial slab */}
                <div className="relative w-full shrink-0 rounded-t-[60px] rounded-b-xl border border-moon/20 bg-black/55 px-6 pb-5 pt-8 text-center shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] lg:mt-24 lg:w-72">
                  <Skull className="absolute -top-5 left-1/2 h-9 w-9 -translate-x-1/2 text-moon/80" />
                  <Sprout className="mx-auto h-7 w-7 text-fern" />
                  <p className="mt-2 font-serif text-base italic">
                    “{project.epitaph || 'A better way to prepare, waiting for its next chapter.'}”
                  </p>
                  <div className="mt-4 text-left">
                    <Progress value={completion} />
                    <p className="mt-1.5 text-xs">{completion}% complete</p>
                    <p className="text-xs text-moon/70">Last active: {project.lastActive || '—'}</p>
                  </div>
                </div>
              </section>

              {/* Tabs */}
              <nav className="mt-6 flex flex-wrap gap-2 border-b border-moon/10">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`inline-flex items-center gap-2 rounded-t-lg border border-b-0 px-6 py-3 text-sm transition ${
                      tab === key
                        ? 'border-fern/40 bg-black/60 text-moon shadow-[inset_0_-2px_0_#8ee6a0]'
                        : 'border-moon/10 bg-black/40 text-moon/70 hover:text-moon'
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
              </nav>

              {/* Tab content */}
                                          {tab !== 'overview' ? (
                <Panel className="mt-12">
                  <p className="text-moon/70">{tabs.find((t) => t.key === tab).label} — coming soon.</p>
                </Panel>
              ) : (
                <div className="mt-12 grid gap-x-14 gap-y-14 xl:grid-cols-[1.15fr_1fr]">
                  {/* Column A */}
                  <div className="min-w-0 space-y-14">
                    <Panel>
                      <PanelTitle icon={BookOpen}>Project Story</PanelTitle>
                      <p className="leading-relaxed text-moon/85">{project.story || project.summary}</p>

                      <h3 className="mb-3 mt-6 flex items-center gap-2.5 font-serif text-xl">
                        <HeartCrack className="h-5 w-5 text-rose-400" /> Why it was abandoned
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {reasons.map((r, i) => {
                          const Icon = reasonIcons[i % reasonIcons.length]
                          return (
                            <div key={r.title} className="rounded-lg border border-moon/15 bg-black/40 p-3">
                              <p className="flex items-center gap-2 text-sm underline underline-offset-2">
                                <Icon className="h-4 w-4 shrink-0 text-amber-300" /> {r.title}
                              </p>
                              <p className="mt-1 text-xs text-moon/65">{r.text}</p>
                            </div>
                          )
                        })}
                      </div>
                    </Panel>

                    <Panel>
                      <PanelTitle icon={ListChecks}>Key Features (Planned)</PanelTitle>
                      <div className="grid grid-cols-2 gap-3">
                        {features.map((f, i) => {
                          const Icon = featureIcons[i % featureIcons.length]
                          return (
                            <div key={f} className="rounded-lg border border-moon/15 bg-black/40 p-3 text-xs">
                              <Icon className="mb-2 h-5 w-5" />
                              {f}
                            </div>
                          )
                        })}
                      </div>
                    </Panel>
                  </div>

                  {/* Column B */}
                  <div className="min-w-0 space-y-14">
                    <Panel>
                      <PanelTitle icon={Info}>Project Info</PanelTitle>
                      <dl className="space-y-3 text-sm">
                        <Row label="Start date">{project.startDate || '—'}</Row>
                        <Row label="Last active">{project.lastActive || '—'}</Row>
                        <Row label="Status">
                          <span
                            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                              badgeClass[project.status] || badgeClass.Buried
                            }`}
                          >
                            {project.status}
                          </span>
                        </Row>
                        <Row label="Completion">
                          <div className="flex items-center gap-3">
                            <div className="min-w-0 flex-1"><Progress value={completion} /></div>
                            <span className="shrink-0">{completion}%</span>
                          </div>
                        </Row>
                        <Row label="Visibility">
                          <span className="inline-flex items-center gap-2">
                            <Lock className="h-4 w-4" /> {project.visibility || 'Private'}
                          </span>
                        </Row>
                        <Row label="Tags">
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 2).map((t) => (
                              <span key={t} className="rounded-full border border-moon/30 bg-black/40 px-3 py-0.5 text-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                        </Row>
                        <Row label="Links">
                          <div className="space-y-1.5">
                            <a href={project.github || '#'} className="flex items-center gap-2 underline">
                              <Code2 className="h-4 w-4 shrink-0" /> GitHub Repository
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            </a>
                            <a href={project.demo || '#'} className="flex items-center gap-2 underline">
                              <Link2 className="h-4 w-4 shrink-0" /> Live Demo (if any)
                              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            </a>
                          </div>
                        </Row>
                      </dl>
                    </Panel>

                    <Panel>
                      <PanelTitle icon={Code2}>Tech Stack (Planned)</PanelTitle>
                      <div className="grid grid-cols-5 gap-2">
                        {stack.map((t) => (
                          <div key={t} className="flex min-w-0 flex-col items-center gap-2 text-[11px]">
                            <span
                              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-black/60 text-xs font-bold ${
                                techColors[t] || 'border-moon/40 text-moon'
                              }`}
                            >
                              {t.slice(0, 2)}
                            </span>
                            <span className="max-w-full truncate">{t}</span>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  </div>
                </div>
              )}
            </div>

            {/* ============ RIGHT SIDEBAR ============ */}
            <aside className="min-w-0 space-y-14 lg:mt-24">
              {/* Compass: box ke bina, alag */}
              <div className="relative rounded-2xl bg-black/35 px-4 py-5 text-center backdrop-blur-[2px]">
                <div className="flex items-center gap-3 text-left">
                  <Compass className="h-9 w-9 shrink-0 text-fern" />
                  <div>
                    <h2 className="font-serif text-xl">The Revival Compass</h2>
                    <p className="text-xs text-moon/70">Let’s find the right path for {project.name}</p>
                  </div>
                </div>

                <img
                  src="/images/compass.png"
                  alt="Compass"
                  className="mx-auto my-2 h-44 w-44 object-contain drop-shadow-[0_0_18px_rgba(142,230,160,0.6)]"
                />

                <Link
                  to={`/compass/${project.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-fern/90 py-2.5 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.4)] transition hover:bg-fern"
                >
                  <Compass className="h-4 w-4" /> Open Revival Compass
                </Link>
              </div>

              <Panel>
                <PanelTitle icon={Zap}>Quick Actions</PanelTitle>
                <div className="space-y-2 text-sm">
                  <ActionBtn icon={Pencil}>Edit Project</ActionBtn>
                  <ActionBtn icon={Archive}>Move to Archived</ActionBtn>
                  <ActionBtn icon={Trash2} danger>Delete</ActionBtn>
                </div>
              </Panel>

              <Panel>
                <PanelTitle icon={Skull}>Project Mood</PanelTitle>
                <div className="space-y-2 text-sm">
                  {['Still excites me', 'Maybe later', 'Not interested now'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMood(m)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                        mood === m ? 'border-fern/60 bg-fern/10' : 'border-moon/15 bg-black/40 hover:border-moon/40'
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          mood === m ? 'border-fern' : 'border-moon/40'
                        }`}
                      >
                        {mood === m && <span className="h-2 w-2 rounded-full bg-fern" />}
                      </span>
                      {m}
                    </button>
                  ))}
                </div>

                <h2 className="mb-2 mt-5 flex items-center gap-2.5 font-serif text-xl">
                  <FileText className="h-5 w-5" /> Notes
                </h2>
                <div className="flex gap-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a quick note..."
                    rows={2}
                    className="min-w-0 flex-1 resize-none rounded-lg border border-moon/15 bg-black/40 p-2 text-sm placeholder:text-moon/40 focus:border-fern/60 focus:outline-none"
                  />
                  <button className="self-end rounded-lg border border-moon/30 bg-black/50 p-2.5 transition hover:border-fern">
                    <Save className="h-4 w-4" />
                  </button>
                </div>
              </Panel>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}