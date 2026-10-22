import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../utils/auth'

const links = [
  { to: '/', label: 'Home' },
  { to: '/graveyard', label: 'Graveyard' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getCurrentUser())

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5">
      <Link to="/" className="flex items-center gap-3 font-serif text-xl text-moon">
        <span className="text-2xl">💀</span>
        The Project Graveyard
      </Link>

      <div className="flex items-center gap-4 md:gap-6 text-sm">
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

        {user ? (
          <>
            <span className="hidden text-moon/80 sm:block">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-moon/30 px-4 py-2 transition hover:border-fern hover:text-fern"
            >
              Logout
            </button>
          </>
        ) : (
                    <Link
            to="/auth"
            className="rounded-lg bg-fern/90 px-4 py-2 font-semibold text-night shadow-[0_0_20px_rgba(142,230,160,0.45)] transition hover:bg-fern"
          >
            Login / Sign up
          </Link>
        )}
      </div>
    </nav>
  )
}