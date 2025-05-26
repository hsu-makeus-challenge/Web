import './App.css'
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import HomeLayout from './layout/HomeLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layout/ProtectedLayout';
import GoogleLoginRedirect from './pages/GoogleLoginRedirect';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpPage from './pages/LpPage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirect />,
      }
    ],
  }
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
      {
        path: 'lp/:lpId',
        element: <LpPage />,
      }
  ]
  }
]

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
// const router = createBrowserRouter([...publicRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false}/>}
    </QueryClientProvider>
  )
}

export default App;