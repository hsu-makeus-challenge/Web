import PlayListPage from './pages/PlayListPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayListPage />} />
      </Routes>
    </Router>
  )
}

export default App
