import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Vision from './components/Vision'
import Website from './components/Website'
import Home from './pages/Home'
import Technology from './pages/Technology'
import Mission from './pages/Mission'
import Blueprint from './pages/Blueprint'
import Engine from './pages/Engine'

function App() {
  const [showWebsite, setShowWebsite] = useState(false)

  if (!showWebsite) {
    return <Vision onAnimationComplete={() => setShowWebsite(true)} />
  }

  return (
    <Router>
      <Website>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/blueprint" element={<Blueprint />} />
          <Route path="/engine" element={<Engine />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Website>
    </Router>
  )
}

export default App
