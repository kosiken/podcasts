import { useState, useEffect } from 'react';

// Our hook
export default function useDebounce<T = any>(value: T, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
const [isSetting, setIsSetting] = useState(false)
  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      if(isSetting) return;
      setIsSetting(true);
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        setIsSetting(false);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  return [debouncedValue, isSetting];
}
