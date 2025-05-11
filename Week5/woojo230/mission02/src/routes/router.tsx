import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import NotFound from '../pages/not-found/notFound';
import NowPlayingPage from '../pages/category/now_playing';
import PopularPage from '../pages/category/popular';
import TopRatedPage from '../pages/category/top-rated';
import UpComingPage from '../pages/category/upcoming';
import Mainlayout from '../layout/layout';
import MovieDetailPage from '../pages/movieDetailPage';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import { requiresAuth } from './loaders/requiresAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'movies',
        errorElement: <NotFound />,
        loader: requiresAuth,
        children: [
          {
            path: 'now-playing',
            element: <NowPlayingPage />,
          },
          {
            path: 'popular',
            element: <PopularPage />,
          },
          {
            path: 'top-rated',
            element: <TopRatedPage />,
          },
          {
            path: 'up-coming',
            element: <UpComingPage />,
          },
          {
            path: ':movieId',
            element: <MovieDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
