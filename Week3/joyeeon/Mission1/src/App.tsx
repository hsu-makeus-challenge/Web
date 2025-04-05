import MovieList from './components/moviescomp/MovieList'
import RootLayout from './layout/Root-layout'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './pages/Notfound'
import Homepage from './pages/Homepage'
import MoviePage from './pages/Moviepage'


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
        path: '/movies/:category',
        element:<MoviePage />
        // children : [
        //   {
        //     path:'/popular',
        //     element:<MoviePage />
        //   }
        // ]
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
