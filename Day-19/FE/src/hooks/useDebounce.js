import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if value changes or component unmounts
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
