import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import LPListPage from './pages/LPListPage';
import LPDetailPage from './pages/LpDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from "./pages/HomeLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import MyPage from "./pages/MyPage";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login page with the attempted location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        path: 'my',
        element: <MyPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/google/callback',
    element: <GoogleLoginRedirectPage />,
  },
]);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

