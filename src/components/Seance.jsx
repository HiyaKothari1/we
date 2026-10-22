import { useState } from 'react'
import { motion } from 'framer-motion'

const prompts = [
  'Why did you leave me?',
  'What were my flaws?',
  'What did you love about me?',
  'What would make you come back?',
]

const storeKey = (id) => `seance_${id}`

function load(id) {
  try {
    return JSON.parse(localStorage.getItem(storeKey(id))) || {}
  } catch {
    return {}
  }
}

function save(id, data) {
  try {
    localStorage.setItem(storeKey(id), JSON.stringify(data))
  } catch {
    // ignore storage errors
  }
}

export default function Seance({ project }) {
  const [answers, setAnswers] = useState(() => load(project.id))
  const [i, setI] = useState(0)
  const [draft, setDraft] = useState('')
  const [redo, setRedo] = useState(false)

  const done = !redo && prompts.every((_, idx) => answers[idx])

  const submit = () => {
    if (!draft.trim()) return
    const next = { ...answers, [i]: draft.trim() }
    setAnswers(next)
    save(project.id, next)
    setDraft('')
    if (i === prompts.length - 1) {
      setRedo(false)
      setI(0)
    } else {
      setI(i + 1)
    }
  }

  const restart = () => {
    setAnswers({})
    save(project.id, {})
    setI(0)
    setDraft('')
    setRedo(true)
  }

  if (done) {
    return (
      <div>
        <div className="text-center">
          <div className="text-4xl">🕯️</div>
          <h3 className="mt-2 font-serif text-2xl">The séance is complete</h3>
          <p className="mt-1 text-sm text-moon/70">
            {project.name} has heard you. Here is what you told it.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {prompts.map((p, idx) => (
            <div key={p} className="rounded-xl border border-fern/20 bg-black/40 p-4">
              <p className="font-serif text-sm italic text-fern">👻 “{p}”</p>
              <p className="mt-2 text-sm text-moon/90">{answers[idx]}</p>
            </div>
          ))}
        </div>

        <button
          onClick={restart}
          className="mt-5 w-full rounded-lg border border-moon/25 py-3 text-sm transition hover:border-fern"
        >
          Hold another séance
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-5xl drop-shadow-[0_0_14px_rgba(142,230,160,0.7)]"
        >
          👻
        </motion.div>
        <p className="mt-2 text-xs text-moon/60">
          {project.name} whispers from beyond... ({i + 1} of {prompts.length})
        </p>
      </div>

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-2xl border border-fern/30 bg-fern/10 p-4 text-center"
      >
        <p className="font-serif text-xl italic text-fern">“{prompts[i]}”</p>
        {i === 0 && project.reason && (
          <p className="mt-2 text-xs text-moon/60">You once said: {project.reason}</p>
        )}
      </motion.div>

      <textarea
        rows={4}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Speak honestly. Only the spirit can hear you..."
        className="mt-4 w-full resize-none rounded-lg border border-fern/20 bg-black/40 p-3 text-sm text-moon placeholder:text-moon/40 outline-none focus:border-fern"
      />

      <button
        onClick={submit}
        disabled={!draft.trim()}
        className="mt-3 w-full rounded-lg bg-fern/90 py-3 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.4)] transition hover:bg-fern disabled:opacity-50"
      >
        {i === prompts.length - 1 ? 'Finish the séance' : 'Answer the spirit →'}
      </button>
    </div>
  )
}