export const useLocalStorage = () => {
  const set = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const get = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  };

  return { set, get, remove };
};

export const useSessionStorage = () => {
  const set = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };

  const get = (key: string): string | null => {
    return sessionStorage.getItem(key);
  };

  const remove = (key: string) => {
    sessionStorage.removeItem(key);
  };

  return { set, get, remove };
};
