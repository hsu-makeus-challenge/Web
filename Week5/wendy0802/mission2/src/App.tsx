import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute"; 
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: (
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        ),
        index: true,
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
        // `Navigate`로 리디렉션 처리
        return <Navigate to="/login" />;
      }
      return null;
    },
  },
]);

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element : <protectedLayout />,
    errorElement: <NotFoundPage />,
    children : [
      {
        path: "my",
        element: <MyPage />,
      }
    ],
  },
];
function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
