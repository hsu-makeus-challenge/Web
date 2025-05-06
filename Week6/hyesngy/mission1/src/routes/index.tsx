import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "@layout/root-layout";
import {
	NotFound,
	LoginPage,
	SignupPage,
	MyPage,
	HomePage,
	GoogleLoginRedirectPage,
	SearchPage,
	LpPage,
	LpDeatilPage,
} from "@pages/index";
import ProtectedRoute from "@components/protected-route";
import { AuthProvider } from "@context/AuthProvider";

const AuthLayout = () => {
	return (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	);
};

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
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
						path: "login/",
						element: <LoginPage />,
					},
					{
						path: "signup/",
						element: <SignupPage />,
					},
					{
						path: "search/",
						element: <SearchPage />,
					},
					{
						path: "lp/",
						children: [
							{
								index: true,
								element: <LpPage />,
							},
							{
								path: ":lpId",
								element: (
									<ProtectedRoute>
										<LpDeatilPage />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "v1/auth/google/callback",
						element: <GoogleLoginRedirectPage />,
					},
					{
						path: "mypage/",
						element: (
							<ProtectedRoute>
								<MyPage />
							</ProtectedRoute>
						),
					},
				],
			},
		],
	},
]);

export default router;
