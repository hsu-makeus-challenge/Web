import { createBrowserRouter } from "react-router-dom"
import RootLayout from "../layout/root-layout";
import ListPage from "../pages/list/list";

const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <ListPage />
        },
      ]
    },
])

export default router;