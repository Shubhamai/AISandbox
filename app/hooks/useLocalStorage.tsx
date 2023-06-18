import { useState, useEffect } from "react";

export const useLocalStorage = (
  key: string,
  defaultValue: string | boolean
): [string, (newVal: string) => void] => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = localStorage.getItem(key) || String(defaultValue);
    } catch (error) {
      currentValue = defaultValue;
    }

    return String(currentValue);
  });

  useEffect(() => {
    localStorage.setItem(key, String(value));
  }, [value, key]);

  return [value, setValue];
};
