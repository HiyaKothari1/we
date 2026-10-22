import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Bury from './pages/Bury'
import Graveyard from './pages/Graveyard'
import Compass from './pages/Compass'
import ProjectDetail from './pages/ProjectDetail'
import Auth from './pages/Auth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/seance" element={<Bury />} />
      <Route path="/graveyard" element={<Graveyard />} />
      <Route path="/compass/:id" element={<Compass />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}