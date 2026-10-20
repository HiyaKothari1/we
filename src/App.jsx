import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Graveyard from './pages/Graveyard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/graveyard" element={<Graveyard />} />
    </Routes>
  )
}