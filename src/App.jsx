import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Estado from './pages/Estado'
import Historial from './pages/Historial'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content" role="main">
        <Routes>
          <Route path="/" element={<Estado />} />
          <Route path="/estado" element={<Estado />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </main>
    </div>
  )
}

export default App