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


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <Notfound />,
    children:[
      {
        index:true,
        element:<Homepage />

      },
      {
        path: '/movies',
        children : [
          {
            path:':category',
            element:<MoviePage />
          },
          {
            path: 'detail/:id',
            element: <DetailMoviePage />
          }
        ]
      },
      {
        path: '/login',
        element:<Loginpage />
      },
      
      {
        path: '/signup',
        element: <Signuppage />
      },

      {
        path:'/signout',
        element: <ProtectedRoute>
          <Logoutpage />
        </ProtectedRoute>
      },

      {
        path:'/mypage',
        element: <ProtectedRoute><Mypage/> </ProtectedRoute>
      }
    ]
  },
])

function App() {
  useEffect(() =>{
    setupInterceptors();
  }, []);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
