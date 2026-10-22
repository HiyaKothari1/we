import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

// Temporary name. Later we will get this from the selected project.
const projectName = 'Prepsport'

const questions = [
  { id: 'care', text: 'Do you still care about this idea?', options: ['Not really', 'A little', 'Absolutely'] },
  { id: 'blocker', text: 'Has the reason you stopped changed?', options: ['No, still a blocker', 'Partially', "Yes, it's resolved"] },
  { id: 'work', text: 'How much useful work is already done?', options: ['Very little', 'Some progress', 'Most of it'] },
  { id: 'tech', text: 'Is the technology still relevant?', options: ['Outdated', 'Not sure', 'Yes, relevant'] },
  { id: 'time', text: 'How much time can you give it now?', options: ['Almost none', 'A little', 'Enough to make progress'] },
]
const paths = {
  continue: {
    label: 'Continue',
    icon: '🌱',
    desc: 'You still care about this idea, there is meaningful progress, and the blockers have eased.',
    why: ['You are still interested in the idea.', 'A good amount of work is already done.', 'The technology is still relevant.', 'You have some time to give it now.'],
    next: 'Pick one small feature and complete it in the next week.',
  },
  restart: {
    label: 'Restart',
    icon: '🔄',
    desc: 'The idea is still worth it, but the old work is too small to build on. A fresh start is easier.',
    why: ['You still care about the idea.', 'Very little useful work exists so far.', 'You can reuse what you learned.', 'A clean start avoids old mistakes.'],
    next: 'Write a one-page plan and rebuild the foundation from scratch.',
  },
  change: {
    label: 'Change the Idea',
    icon: '💡',
    desc: 'The original blocker still exists. Reshaping the idea can get around it.',
    why: ['The reason you stopped is still a problem.', 'The core interest is still alive.', 'A new angle can remove the blocker.'],
    next: 'Rewrite the idea in one sentence so it avoids the old blocker.',
  },
  repurpose: {
    label: 'Repurpose',
    icon: '♻️',
    desc: 'The whole project may not be worth reviving, but parts of it can live on in something new.',
    why: ['Some useful work is already done.', 'The full idea is outdated or less exciting now.', 'Reusing parts saves a lot of time.'],
    next: 'List the reusable parts and move them into a new project.',
  },
  archive: {
    label: 'Archive',
    icon: '📦',
    desc: 'Right now is not the time. Let it rest peacefully, and you can return anytime.',
    why: ['Time or interest is low right now.', 'The blocker is still there.', 'Resting is a healthy choice, not a failure.'],
    next: 'Add a final note and let it rest. Revisit it in a few months.',
  },
}

function getPath(a) {
  // answers: 0 = lowest option, 2 = highest option
  if (a.care === 0) return a.work >= 1 ? 'repurpose' : 'archive'
  if (a.time === 0 && a.blocker === 0) return 'archive'
  if (a.tech === 0) return a.work >= 1 ? 'repurpose' : 'change'
  if (a.work === 0) return 'restart'
  if (a.blocker === 0) return 'change'
  return 'continue'
}

export default function Compass() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
    const [override, setOverride] = useState(null)
  const [choosing, setChoosing] = useState(false)
  const [applied, setApplied] = useState(false)

  const answered = Object.keys(answers).length
    const pick = (id, index) => {
    setAnswers({ ...answers, [id]: index })
    setOverride(null)
    setChoosing(false)
    setApplied(false)
  }

  const recommended = answered === 5 ? getPath(answers) : null
  const activeKey = override || recommended
  const path = activeKey ? paths[activeKey] : null

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/compass-bg.jpg')", backgroundPosition: 'center bottom' }}
    >
      <div className="min-h-screen bg-night/30">
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 pb-[32vh] pt-24">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-moon/30 bg-night/70 px-4 py-2 text-sm transition hover:border-fern"
          >
            ← Back to Project
          </button>

          <div className="mt-6 text-center">
            <h1 className="font-metal text-5xl tracking-wide text-fern drop-shadow-[0_0_20px_rgba(142,230,160,0.6)] md:text-6xl">
              The Revival Compass
            </h1>
            <p className="mt-3 font-serif text-lg md:text-xl">
              Answer 5 quick questions to find the right path for {projectName}.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        {/* Questions */}
            <section className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-moon/70">
                <span>{answered} of 5 answered</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-fern shadow-[0_0_10px_rgba(142,230,160,0.8)]"
                    animate={{ width: `${(answered / 5) * 100}%` }}
                  />
                </div>
              </div>

              {questions.map((q, i) => {
                const done = answers[q.id] !== undefined
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex gap-3 rounded-2xl border bg-night/55 p-3 backdrop-blur-sm transition ${
                      done ? 'border-fern/40' : 'border-moon/10 hover:border-fern/30'
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-serif text-base transition ${
                        done
                          ? 'border-fern bg-fern/20 text-fern shadow-[0_0_16px_rgba(142,230,160,0.6)]'
                          : 'border-moon/30 bg-moss/60 text-moon/70'
                      }`}
                    >
                      {done ? '✓' : i + 1}
                    </div>

                    <div className="flex-1">
                      <p className="mb-2 font-serif text-base">{q.text}</p>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {q.options.map((opt, idx) => {
                          const sel = answers[q.id] === idx
                          return (
                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              key={opt}
                              onClick={() => pick(q.id, idx)}
                              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition ${
                                sel
                                  ? 'border-fern bg-fern/15 text-fern shadow-[0_0_14px_rgba(142,230,160,0.35)]'
                                  : 'border-moon/15 bg-moss/40 text-moon/80 hover:border-fern/50'
                              }`}
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                                  sel ? 'border-fern bg-fern text-night' : 'border-moon/40'
                                }`}
                              >
                                {sel && '✓'}
                              </span>
                              {opt}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </section>

                        {/* Recommendation card */}
            <aside className="flex flex-col rounded-2xl border border-fern/40 bg-night/65 p-5 shadow-[0_0_30px_rgba(142,230,160,0.2)] backdrop-blur-md">
              {!path ? (
                <div className="py-6 text-center">
                  <div className="text-4xl">🧭</div>
                  <p className="mt-3 font-serif text-lg">Your path is waiting</p>
                  <p className="mt-1 text-sm text-moon/60">
                    Answer {5 - answered} more question{5 - answered === 1 ? '' : 's'} to reveal it.
                  </p>
                </div>
              ) : (
                <motion.div key={activeKey} className="flex flex-1 flex-col" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-sm text-moon/60">Recommended Path</p>
                  <h2 className="mt-1 font-metal text-4xl text-fern drop-shadow-[0_0_14px_rgba(142,230,160,0.6)]">
                    {path.icon} {path.label}
                  </h2>
                  <p className="mt-3 text-sm text-moon/80">{path.desc}</p>

                  <h3 className="mt-5 font-serif text-lg">Why this path?</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-moon/80">
                    {path.why.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span className="text-fern">✓</span>
                        {w}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-xl border border-lantern/30 bg-lantern/10 p-3 text-sm">
                    <span className="font-semibold text-lantern">Next step: </span>
                    {path.next}
                  </div>
                                                      <div className="mt-5">
                    <h3 className="font-serif text-lg">Your answers</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {questions.map((q) => (
                        <span
                          key={q.id}
                          className="rounded-full border border-fern/25 bg-fern/10 px-3 py-1 text-xs text-fern"
                        >
                          {q.options[answers[q.id]]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <button
                      onClick={() => setApplied(true)}
                      disabled={applied}
                      className="w-full rounded-lg bg-fern/90 py-3 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.4)] transition hover:bg-fern disabled:opacity-70"
                    >
                      {applied ? '✓ Path applied' : 'Apply This Path'}
                    </button>
                    <button
                      onClick={() => setChoosing(!choosing)}
                      className="mt-2 w-full rounded-lg border border-moon/25 py-3 text-sm transition hover:border-fern"
                    >
                      Choose Another Path
                    </button>
                    {choosing && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {Object.entries(paths)
                          .filter(([key]) => key !== activeKey)
                          .map(([key, p]) => (
                            <button
                              key={key}
                              onClick={() => {
                                setOverride(key)
                                setChoosing(false)
                                setApplied(false)
                              }}
                              className="rounded-lg border border-moon/20 bg-moss/50 px-2 py-2 text-xs transition hover:border-fern"
                            >
                              {p.icon} {p.label}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}