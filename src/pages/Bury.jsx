import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { addProject } from '../utils/storage'

const steps = ['Basic Info', 'Vision & Progress', "What's Left", 'Reason & Epitaph']

const inputClass =
  'w-full rounded-lg border border-fern/20 bg-night/70 px-4 py-3 text-moon placeholder:text-moon/40 outline-none focus:border-fern'

export default function Bury() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    tags: '',
    link: '',
    startDate: '',
    lastActive: '',
    vision: '',
    completed: '',
    progress: 50,
    unfinished: '',
    salvage: '',
        reason: '',
    reasonNote: '',
    epitaph: '',
  })

  const update = (field, value) => setForm({ ...form, [field]: value })
    const lines = (t) => t.split('\n').map((s) => s.trim()).filter(Boolean)

  const save = () => {
    const y1 = form.startDate.slice(0, 4)
    const y2 = form.lastActive.slice(0, 4)
    const years =
      y1 && y2 && y1 !== y2 ? `${y1} - ${y2}` : y1 || y2 || String(new Date().getFullYear())

    addProject({
      id: Date.now().toString(),
      name: form.name.trim(),
      icon: '🪦',
      years,
      status: 'Buried',
      progress: form.progress,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      summary: form.vision.trim().slice(0, 100),
      vision: form.vision.trim(),
      completed: lines(form.completed),
      unfinished: lines(form.unfinished),
      reason: form.reason,
      reasonNote: form.reasonNote.trim(),
      epitaph: form.epitaph.trim(),
      salvage: lines(form.salvage),
      link: form.link.trim(),
      createdAt: form.startDate || new Date().toISOString().slice(0, 10),
      buriedAt: form.lastActive || new Date().toISOString().slice(0, 10),
    })
    navigate('/graveyard')
  }

  const next = () => {
        if (step === 3) {
      save()
      return
    }
    if (step === 0 && !form.name.trim()) {
      setError('Project name is required')
      return
    }
    setError('')
    setStep(step + 1)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bury-bg.jpg')" }}
    >
      <div className="min-h-screen bg-night/50">
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 pb-16 pt-28">
          <h1 className="font-metal text-5xl tracking-wide text-moon drop-shadow-[0_0_18px_rgba(142,230,160,0.45)] md:text-6xl">
            Bury a Project
          </h1>
          <p className="mt-3 font-serif text-lg md:text-xl">
            Give your unfinished idea a proper resting place.
          </p>

          {/* Progress bar */}
          <div className="mt-10 flex items-start justify-between md:ml-auto md:w-[62%]">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    i === step
                      ? 'border-fern bg-moss text-fern shadow-[0_0_18px_rgba(142,230,160,0.7)]'
                      : i < step
                      ? 'border-fern bg-fern text-night'
                      : 'border-moon/30 bg-night/70 text-moon/60'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`mt-2 text-xs md:text-sm ${i === step ? 'text-fern' : 'text-moon/70'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="mt-8 rounded-2xl border border-fern/25 bg-night/75 p-6 backdrop-blur-sm md:ml-auto md:w-[62%] md:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block">
                    Project name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. My Next Big Idea"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                  {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
                </div>

                <div>
                  <label className="mb-2 block">Tags (comma separated)</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Web, Education, AI"
                    value={form.tags}
                    onChange={(e) => update('tags', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block">Link (GitHub / Drive / Figma)</label>
                  <input
                    className={inputClass}
                    placeholder="https://"
                    value={form.link}
                    onChange={(e) => update('link', e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block">Start date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.startDate}
                      onChange={(e) => update('startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block">Last active date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.lastActive}
                      onChange={(e) => update('lastActive', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

                        {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block">What did you want to build?</label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    placeholder="Describe the original vision of your project..."
                    value={form.vision}
                    onChange={(e) => update('vision', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block">What did you complete? (one per line)</label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    placeholder={'Login page\nHome UI\nBasic search'}
                    value={form.completed}
                    onChange={(e) => update('completed', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 flex justify-between">
                    <span>How much was finished?</span>
                    <span className="font-semibold text-fern">{form.progress}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full accent-[#8ee6a0]"
                    value={form.progress}
                    onChange={(e) => update('progress', Number(e.target.value))}
                  />
                </div>
              </div>
            )}

                        

                        {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block">What is still unfinished? (one per line)</label>
                  <textarea
                    rows={5}
                    className={inputClass}
                    placeholder={'Payment system\nMobile layout\nAdmin dashboard'}
                    value={form.unfinished}
                    onChange={(e) => update('unfinished', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block">
                    Parts worth saving (one per line)
                  </label>
                  <textarea
                    rows={4}
                    className={inputClass}
                    placeholder={'Auth flow\nUI kit\nDataset'}
                    value={form.salvage}
                    onChange={(e) => update('salvage', e.target.value)}
                  />
                  <p className="mt-1 text-xs text-moon/60">
                    These become "Organ Donors" you can reuse in a new project.
                  </p>
                </div>
              </div>
            )}

                        {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block">Why did you stop?</label>
                  <select
                    className={inputClass}
                    value={form.reason}
                    onChange={(e) => update('reason', e.target.value)}
                  >
                    <option value="">Pick a reason</option>
                    <option>Lost interest</option>
                    <option>Time ran out</option>
                    <option>Scope grew too big</option>
                    <option>Got stuck technically</option>
                    <option>Team drifted apart</option>
                    <option>Something else came up</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block">Want to add a note?</label>
                  <textarea
                    rows={3}
                    className={inputClass}
                    placeholder="What really happened..."
                    value={form.reasonNote}
                    onChange={(e) => update('reasonNote', e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block">Epitaph (a line for the tombstone)</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Gone too soon, but never forgotten"
                    value={form.epitaph}
                    onChange={(e) => update('epitaph', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between md:ml-auto md:w-[62%]">
            <button
              onClick={() => (step === 0 ? navigate('/graveyard') : setStep(step - 1))}
              className="rounded-lg border border-moon/30 bg-night/70 px-6 py-3 transition hover:border-fern"
            >
              {step === 0 ? 'Cancel' : '← Back'}
            </button>
            <button
              onClick={next}
              className="rounded-lg bg-fern/90 px-7 py-3 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.4)] transition hover:bg-fern"
            >
                            {step === 3 ? 'Bury it ⚰️' : 'Next →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}