export interface NavItem {
	path: string;
	label: string;
}

export const navItems: NavItem[] = [
	{ path: "/", label: "홈" },
	{ path: "/movies/popular", label: "인기 영화" },
	{ path: "/movies/up-coming", label: "상영 중" },
	{ path: "/movies/top-rated", label: "평점 높은" },
	{ path: "/movies/now-playing", label: "개봉 예정" },
];
