import "./App.css";
import Homepage from "./pages/Homepage";
import MoviePage from "./pages/MoviePage";
import { JSX, ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: "movies/:category",
      element: <MoviePage />,
      },
    ]
  },
]);



function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
