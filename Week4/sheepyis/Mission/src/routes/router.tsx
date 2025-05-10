import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/root-layout";

import LoginPage from "../pages/login/login";
import SignUpPage from "../pages/signUp/signUp";
import HomePage from "../pages/home/home";
import PopularPage from "../pages/movies/popular";
import NowPlayingPage from "../pages/movies/nowPlaying";
import TopRatedPage from "../pages/movies/topRated";
import UpComingPage from "../pages/movies/upComing";
import MovieDetailPage from "../pages/movies/movieDetail";
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
          path: "login",
          element: <LoginPage />
        },
        {
          path: "signup",
          element: <SignUpPage />
        },
        {
          path: "movies",
          children: [
            {
              path: "popular",
              element: <PopularPage />
            },
            {
              path: "now_playing",
              element: <NowPlayingPage />
            },
            {
              path: "top-rated",
              element: <TopRatedPage />
            },
            {
              path: "upcoming",
              element: <UpComingPage />
            },
            {
              path: ":movieId",
              element: <MovieDetailPage />
            }
          ]
        }
      ]
    },
])

export default router;