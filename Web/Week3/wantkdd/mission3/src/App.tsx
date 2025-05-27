import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home-page';
import PopularMoviesPage from './pages/popular-movies';
import UpcomingMoviesPage from './pages/upcoming-movies';
import TopRatedMoviesPage from './pages/top-rated-movies';
import NowPlayingMoviesPage from './pages/now-playing-movies';
import DetailPage from './pages/detail-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/movies/popular',
        element: <PopularMoviesPage />,
      },
      {
        path: '/movies/upcoming',
        element: <UpcomingMoviesPage />,
      },
      {
        path: '/movies/top-rated',
        element: <TopRatedMoviesPage />,
      },
      {
        path: '/movies/now_playing',
        element: <NowPlayingMoviesPage />,
      },
      {
        path: 'movie/:movieId',
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
