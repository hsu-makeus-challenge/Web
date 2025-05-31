import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@layout/root-layout";
import {
	HomePage,
	NotFound,
	MovieCategoryPage,
	DetailPage,
	LoginPage,
	SignupPage,
} from "@pages/index";

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
			{
				path: "login/",
				element: <LoginPage />,
			},
			{
				path: "signup/",
				element: <SignupPage />,
			},
		],
	},
]);

export default router;
