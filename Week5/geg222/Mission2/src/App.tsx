import "./App.css";
import Homepage from "./pages/Homepage";
import MoviePage from "./pages/MoviePage";
import { JSX } from "react";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layout/HomeLayout";
import { SignupPage } from "./pages/SignupPage";
import Mypage from "./pages/Mypage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layout/ProtectedLayout";



const publicRoutes:RouteObject[] = [
  {
  path: "/",
  element: <HomeLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
    path: "movies/:category",
    element: <MoviePage />,
    },
    {
      path: "movie/:movieId",
      element: <MovieDetailPage />,
      },
    {
      path: "login",
      element: <LoginPage />
    },
    {
      path: "signup",
      element: <SignupPage />
    }
  ]
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <ProtectedLayout />,
        children: [
          {
            path: "my",
            element: <Mypage />,
          }
        ]
      }
    ]
  }
]


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);


function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
