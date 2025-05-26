import { useState, useEffect, useRef } from "react";

export function useThrottle<T>(value: T, delay = 500): T {
	const [throttledValue, setThrottledValue] = useState<T>(value);
	const lastExecRef = useRef<number>(Date.now());

	useEffect(() => {
		const now = Date.now();
		const elapsed = now - lastExecRef.current;

		if (elapsed >= delay) {
			lastExecRef.current = now;
			setThrottledValue(value);
		} else {
			const timerId = setTimeout(() => {
				lastExecRef.current = Date.now();
				setThrottledValue(value);
			}, delay - elapsed);

			return () => clearTimeout(timerId);
		}
	}, [value, delay]);

	return throttledValue;
}

export default useThrottle;
