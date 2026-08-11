import { useState, useEffect, useCallback } from "react";

/**
 * Interface defining the options/parameters for the custom hook.
 */
interface UseCustomHookOptions {
  initialValue?: string;
  delayMs?: number;
}

/**
 * Interface defining the return values and functions from the custom hook.
 */
interface UseCustomHookReturn {
  value: string;
  isLoading: boolean;
  error: Error | null;
  updateValue: (newValue: string) => void;
  resetValue: () => void;
}

/**
 * A modern custom React hook template.
 * 
 * @param options - Configuration options for the hook
 * @returns State values and controller functions
 * 
 * @example
 * ```tsx
 * const { value, isLoading, updateValue } = useCustomHook({ initialValue: "Hello" });
 * ```
 */
export const useCustomHook = (
  options: UseCustomHookOptions = {}
): UseCustomHookReturn => {
  const { initialValue = "", delayMs = 0 } = options;

  // 1. State definitions
  const [value, setValue] = useState<string>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 2. Effects (e.g., initial setup, fetching, event listeners)
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (delayMs > 0) {
        setIsLoading(true);
        try {
          // Simulate an async operation
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          
          if (isMounted) {
            setValue(initialValue);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error("An error occurred"));
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    initialize();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [initialValue, delayMs]);

  // 3. Callback functions (memoized with useCallback)
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialValue);
    setError(null);
  }, [initialValue]);

  // 4. Return the interface
  return {
    value,
    isLoading,
    error,
    updateValue,
    resetValue,
  };
};
