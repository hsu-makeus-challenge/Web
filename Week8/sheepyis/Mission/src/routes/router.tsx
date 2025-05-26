import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/root-layout";
import ProtectedRoute from "../components/router/protectedRoute";

import LoginPage from "../pages/login/login";
import OAuthCallbackPage from "../pages/login/oauthCallback";
import SignUpPage from "../pages/signUp/signUp";
import MypagePage from "../pages/mypage/mypage";
import HomePage from "../pages/home/home";
import SearchPage from "../pages/search/search";
import LpDetailPage from "../pages/lp/lpDetail";
import NotFoundPage from "../pages/notFound/notFound";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "search",
          element: <SearchPage />
        },
        {
          path: "login",
          element: <LoginPage />
        },
        {
          path: "v1/auth/google/callback",
          element: <OAuthCallbackPage />
        },
        {
          path: "signup",
          element: <SignUpPage />
        },
        {
          path: "mypage",
          element: (
            <ProtectedRoute>
              <MypagePage />
            </ProtectedRoute>
          )
        },
        {
          path: "lp/:id",
          element: (
            <ProtectedRoute>
              <LpDetailPage />
            </ProtectedRoute>
          )
        }
      ]
    },
])

export default router;