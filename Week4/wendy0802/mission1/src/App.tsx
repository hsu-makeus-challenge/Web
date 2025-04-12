import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Login from "./pages/Login"; // 로그인 페이지 import
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // 홈 페이지
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
        index: true,
      },
      {
        path: "movies/:category/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, // 로그인 페이지
  },
  {
    path: "/signup",
    element: <SignUp />, // 회원가입 페이지
  },
  {
    path: "/home", // 홈 페이지
    element: <HomePage />, // 로그인 후 이동할 HomePage
  },
]);

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
