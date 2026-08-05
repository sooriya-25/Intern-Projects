import { renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce";

describe("useDebounce hook", () => {
  jest.useFakeTimers();

  test("returns debounced value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "a", delay: 300 },
      }
    );

    expect(result.current).toBe("a");

    rerender({ value: "b", delay: 300 });
    jest.advanceTimersByTime(299);
    expect(result.current).toBe("a");

    jest.advanceTimersByTime(1);
    expect(result.current).toBe("b");
  });
});
