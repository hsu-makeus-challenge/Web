import './App.css'
import { JSX } from 'react'
import MoviePage from './pages/MoviePage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import MovieDetailPage from './pages/MovieDetailPage';
import HomeLayout from './layout/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      }
    ]
  },
]);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
}

export default App
