import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Bury from './pages/Bury'
import Graveyard from './pages/Graveyard'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/seance" element={<Bury />} />
      <Route path="/graveyard" element={<Graveyard />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  )
}