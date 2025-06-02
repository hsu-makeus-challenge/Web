import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import PlayList from './components/PlayList'
import AddSongForm from './components/AddSongForm'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist" element={<PlayList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;