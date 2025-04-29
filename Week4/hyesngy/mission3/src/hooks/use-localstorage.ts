export const useLocalStorage = (key: string) => {
	const setItem = (value: unknown) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log("🚀 ~ setItem ~ error:", error);
		}
	};

	const getItem = () => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				return JSON.parse(item);
			}
		} catch (error) {
			console.log("🚀 ~ getItem ~ error:", error);
		}
	};

	const removeItem = () => {
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.log("🚀 ~ removeItem ~ error:", error);
		}
	};

	return { setItem, getItem, removeItem };
};
