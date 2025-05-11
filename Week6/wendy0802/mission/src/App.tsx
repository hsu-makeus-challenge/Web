import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import LPListPage from './pages/LPListPage';
import LPDetailPage from './pages/LPDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from "./pages/HomeLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import MyPage from "./pages/MyPage";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
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
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: 'my',
        element: <MyPage />,
      },
    ],
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

