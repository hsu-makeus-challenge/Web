import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValueState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (typeof initialValue === "string") {
        return item !== null ? (item as unknown as T) : initialValue;
      }

      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("로컬스토리지 get 실패:", error);
      return initialValue;
    }
  });

  const setStoredValue = (value: T) => {
    try {
      setStoredValueState(value);

      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);

      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.warn("로컬스토리지 set 실패:", error);
    }
  };

  return [storedValue, setStoredValue] as const;
}
