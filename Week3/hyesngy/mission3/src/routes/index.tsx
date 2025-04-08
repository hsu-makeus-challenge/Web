import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/home";
import NotFound from "@pages/not-found";
import RootLayout from "@layout/root-layout";
import PopularPage from "@pages/movies/page/popular";
import UpCommingPage from "@pages/movies/page/up-coming";
import TopRatedPage from "@pages/movies/page/top-rated";
import NowPlayingPage from "@pages/movies/page/now-playing";
import DetailPage from "@pages/movies/page/movie-detail";

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
						path: "popular",
						element: <PopularPage />,
					},
					{
						path: "up-coming",
						element: <UpCommingPage />,
					},
					{
						path: "top-rated",
						element: <TopRatedPage />,
					},
					{
						path: "now-playing",
						element: <NowPlayingPage />,
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
