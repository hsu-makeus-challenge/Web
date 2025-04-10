import './App.css'
import { JSX } from 'react'
import MoviePage from './pages/MoviePage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import MovieDetailPage from './pages/MovieDetailPage';
import HomeLayout from './layout/HomeLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'my',
        element: <MyPage />
      }
    ]
  },
]);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
}

export default App
