import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout"; 
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedLayout from "./pages/ProtectedLayout";
import SearchPage from "./pages/SearchPage";

import { AuthProvider } from "./context/AuthContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, 
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: (
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "movies/:category/:movieId",
        element: (
          <ProtectedRoute>
            <MovieDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomePage />,
    loader: async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "my",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
