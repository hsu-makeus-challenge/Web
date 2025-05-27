import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import AlbumPage from "../pages/playlistPage";
import NotFoundPage from "../pages/notFoundPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				index: true,
				element: <AlbumPage />,
			},
		],
	},
]);
