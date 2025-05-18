import { useState, useRef, useEffect } from "react";

export const useCommentMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setIsMenuOpen(false);
		}
	};

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return {
		isMenuOpen,
		menuRef,
		toggleMenu,
		closeMenu,
	};
};
