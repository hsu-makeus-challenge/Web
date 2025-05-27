import RootLayout from './layout/Root-layout'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './pages/Notfound'
import Homepage from './pages/Homepage'
import MoviePage from './pages/Moviepage'
import DetailMoviePage from './pages/DetailMoviePage'


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
      }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
