import { useEffect, useMemo, useRef, useState } from "react";

// Counts down to a fixed point in time (an epoch ms timestamp), rather than
// just ticking down from a duration. Driving it off a target timestamp
// (instead of "start at N and decrement") keeps it accurate even if the tab
// is backgrounded/throttled, and makes it trivial to restart whenever the
// server hands back a new `expiresInMinutes`.
//
// Usage:
//   const { secondsLeft, isExpired, restart } = useCountdown();
//   restart(Date.now() + expiresInMinutes * 60 * 1000);
export const useCountdown = (initialTargetTime = null) => {
  const [targetTime, setTargetTime] = useState(initialTargetTime);
  const [now, setNow] = useState(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!targetTime) return undefined;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(intervalRef.current);
  }, [targetTime]);

  const secondsLeft = useMemo(() => {
    if (!targetTime) return 0;

    return Math.max(0, Math.ceil((targetTime - now) / 1000));
  }, [targetTime, now]);

  const restart = (newTargetTime) => {
    setNow(Date.now());
    setTargetTime(newTargetTime);
  };

  const clear = () => {
    clearInterval(intervalRef.current);
    setTargetTime(null);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return {
    secondsLeft,
    isExpired: Boolean(targetTime) && secondsLeft === 0,
    label,
    restart,
    clear,
  };
};
