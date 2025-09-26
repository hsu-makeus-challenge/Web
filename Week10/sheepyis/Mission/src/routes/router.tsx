import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/root-layout";
import MoviePage from "../pages/movie";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <MoviePage />
        },
      ]
    },
])

export default router;