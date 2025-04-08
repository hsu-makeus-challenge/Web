import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import UpcomingPage from './pages/UpcomingPage';
import TopRatedPage from './pages/TopRatedPage';
import NowPlayingPage from './pages/NowPlayingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> {/* 모든 경로에서 Layout 렌더 */}
          <Route index element={<HomePage />} />
          <Route path="movies/popular" element={<PopularPage />} />
          <Route path="movies/upcoming" element={<UpcomingPage />} />
          <Route path="movies/top-rated" element={<TopRatedPage />} />
          <Route path="movies/now-playing" element={<NowPlayingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;