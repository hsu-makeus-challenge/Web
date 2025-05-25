import RootLayout from './layout/Root-layout'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Notfound from './pages/Notfound'
import Homepage from './pages/Homepage'
import MoviePage from './pages/Moviepage'
import DetailMoviePage from './pages/DetailMoviePage'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/SignupPage'
import ProtectedRoute from './components/ProtectedRoute'
import Logoutpage from './pages/Logout'
import Mypage from './pages/Mypage'

import { setupInterceptors } from './apis/interceptor'
import { useEffect } from 'react'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'
import LPpage from './pages/LPpage'
import LPDetailPage from './pages/LpDetailPage'
import SearchPage from './pages/Search'
import { useMypageStore } from './stores/MypageStore'
import { ToastContainer, toast } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <LPpage />

      },
      {
        path: '/movies',
        children: [
          {
            path: ':category',
            element: <MoviePage />
          },
          {
            path: 'detail/:id',
            element: <DetailMoviePage />
          }
        ]
      },
      {
        path: '/login',
        element: <Loginpage />
      },

      {
        path: '/signup',
        element: <Signuppage />
      },

      {
        path: '/signout',
        element: <ProtectedRoute>
          <Logoutpage />
        </ProtectedRoute>
      },
      {
        path: '/v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />
      },

      {
        path: '/mypage',
        element: <ProtectedRoute><Mypage /> </ProtectedRoute>
      },
      {
        path: '/lp',
        children: [
          {
            path: ':id',
            element: <ProtectedRoute><LPDetailPage /></ProtectedRoute>
          }
        ]
      },
      {
        path: '/search',
        element: <SearchPage />

      }
    ]
  },
])

function App() {
  //const notify = () => toast("Wow so easy!");
  const fetchUserInfo = useMypageStore((state) => state.fetchUserInfo);
  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
      fetchUserInfo();
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
    
  )
}

export default App
