import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LPListPage from '../pages/LPListPage';
import LPDetailPage from '../pages/LPDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import HomeLayout from "../pages/HomeLayout";
import GoogleLoginRedirectPage from "../pages/GoogleLoginRedirectPage";
import MyPage from "../pages/MyPage";
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        path: 'lps',
        element: <LPListPage />,
      },
      {
        path: 'lp/:lpId',
        element: <LPDetailPage />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: 'my',
        element: <MyPage />,
      },
    ],
  },
]);

export default router; 