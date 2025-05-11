export interface NavItem {
	path: string;
	label: string;
}

export const navItems: NavItem[] = [{ path: "/", label: "홈" }];

export const authItems: NavItem[] = [
	{ path: "/login", label: "로그인" },
	{ path: "/signup", label: "회원가입" },
];
