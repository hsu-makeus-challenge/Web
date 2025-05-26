import { useCallback, useEffect, useRef } from "react";

export function useThrottledIntersection(callback: () => void, delay = 500) {
	const lastExecRef = useRef<number>(0);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isVisibleRef = useRef<boolean>(false);

	const handleIntersection = useCallback(
		(isVisible: boolean) => {
			isVisibleRef.current = isVisible;

			if (isVisible) {
				const now = Date.now();
				const elapsed = now - lastExecRef.current;

				if (elapsed >= delay) {
					lastExecRef.current = now;
					callback();
				} else if (!timerRef.current) {
					timerRef.current = setTimeout(() => {
						if (isVisibleRef.current) {
							lastExecRef.current = Date.now();
							callback();
						}
						timerRef.current = null;
					}, delay - elapsed);
				}
			}
		},
		[callback, delay],
	);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return handleIntersection;
}

export default useThrottledIntersection;
