export interface NavItem {
	path: string;
	label: string;
}

export const navItems: NavItem[] = [
	{ path: "/", label: "홈" },
	{ path: "/movies/category/popular", label: "인기 영화" },
	{ path: "/movies/category/upcoming", label: "상영 중" },
	{ path: "/movies/category/top_rated", label: "평점 높은" },
	{ path: "/movies/category/now_playing", label: "개봉 예정" },
];
