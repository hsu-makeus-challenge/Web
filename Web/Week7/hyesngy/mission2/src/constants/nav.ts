export interface NavItem {
	path: string;
	label: string;
}

export const navItems: NavItem[] = [
	{ path: "/search", label: "찾기" },
	{ path: "/mypage", label: "마이페이지" },
];

export const authItems: NavItem[] = [
	{ path: "/login", label: "로그인" },
	{ path: "/signup", label: "회원가입" },
];
