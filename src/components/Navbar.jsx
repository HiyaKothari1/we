import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/graveyard', label: 'Graveyard' },
  { to: '/map', label: 'Map' },
]

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5">
      <Link to="/" className="flex items-center gap-3 font-serif text-xl text-moon">
        <span className="text-2xl">💀</span>
        The Project Graveyard
      </Link>

      <div className="flex items-center gap-6 md:gap-8 text-sm">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `hidden sm:block transition hover:text-fern ${isActive ? 'text-fern' : 'text-moon/80'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/seance"
          className="rounded-lg bg-fern/90 px-4 py-2 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.45)] transition hover:bg-fern"
        >
          Bury a Project
        </Link>
      </div>
    </nav>
  )
}