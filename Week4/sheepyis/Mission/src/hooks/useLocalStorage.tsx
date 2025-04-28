import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValueState] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn("로컬스토리지 get 실패:", error);
            return initialValue;
        }
    });

    const setStoredValue = (value: T) => {
        try {
            setStoredValueState(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("로컬스토리지 set 실패:", error);
        }
    };

    return [storedValue, setStoredValue] as const;
}
