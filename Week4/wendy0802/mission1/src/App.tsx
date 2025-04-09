import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import Login from './pages/Login'; // 로그인 페이지 import
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
        index: true,
      }, 
      { 
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />,
      }
    ],
  },
  {
    path: '/login', 
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
   