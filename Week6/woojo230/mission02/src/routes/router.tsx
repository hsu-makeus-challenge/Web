import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import NotFound from '../pages/not-found/notFound';
import Mainlayout from '../layout/layout';
import Login from '../pages/login';
import SignUp from '../pages/signup';
import { requiresAuth } from './loaders/requiresAuth';
import { GoogleRedirect } from '../pages/socialLogin/googleRedirect';
import MyPage from '../pages/myPage';
import LpDetailPage from '../pages/lpDetailPage';

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
        children: [
          {
            path: 'mypage',
            element: <MyPage />,
          },
        ],
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
        path: '/v1/auth/google/callback',
        element: <GoogleRedirect />,
      },
      {
        path: 'lp',
        loader: requiresAuth,
        children: [
          {
            path: ':Lpid',
            element: <LpDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
