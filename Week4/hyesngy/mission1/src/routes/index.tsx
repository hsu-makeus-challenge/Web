import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/home";
import NotFound from "@pages/not-found";
import RootLayout from "@layout/root-layout";
import DetailPage from "@pages/movies/page/movie-detail";
import MovieCategoryPage from "@pages/movies/page/movie-category";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "movies/",
				children: [
					{
						path: "category/:category",
						element: <MovieCategoryPage />,
					},
					{
						path: ":movieId",
						element: <DetailPage />,
					},
				],
			},
		],
	},
]);

export default router;
