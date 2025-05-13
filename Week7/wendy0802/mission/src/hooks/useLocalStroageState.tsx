import { useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T | null = null) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | null) => {
    try {
      setStoredValue(value);
      if (value === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      // handle error
    }
  };

  return [storedValue, setValue] as const;
}