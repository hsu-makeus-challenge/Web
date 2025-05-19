import { createBrowserRouter, RouterProvider, Navigate, useLocation, RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import SearchPage from './pages/SearchPage';
import ThrottlePage from './pages/ThrottlePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  }, 
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return children;
};

const piblicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "signup",
        element: <SignUp/>,
      },
      {
        path: "auth/google/callback",
        element: <GoogleLoginRedirectPage/>,
      },
      {
        path: "lps",
        element: <LPListPage/>,
      },
      {
        path: "lp/:lpId",
        element: <LPDetailPage/>,
      },
      {
        path: "my",
        element: <MyPage/>,
      },
      {
        path: "search",
        element: <SearchPage/>,
      },
      {
        path: "throttle",
        element: <ThrottlePage/>,
      },
    ],
  },
];

// const publicRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//         <HomeLayout />
//     ),
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: 'lps',
//         element: <LPListPage />,
//       },
//       {
//         path: 'lp/:lpId',
//         element: <LPDetailPage />,
//       },
//       {
//         path: 'my',
//         element: <MyPage />,
//       },
//       {
//         path: 'search',
//         element: <SearchPage />,
//       },
//     ],
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/signup',
//     element: <SignUp />,
//   },
//   {
//     path: '/auth/google/callback',
//     element: <GoogleLoginRedirectPage />,
//   },
//   {
//     path: '/throttle',
    
//   }

// ]);

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <SidebarProvider>
            <RouterProvider router={createBrowserRouter(piblicRoutes)} />
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

