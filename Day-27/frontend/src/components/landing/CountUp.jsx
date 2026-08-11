import { useEffect, useState } from "react";

const CountUp = ({ end, duration = 1600, start = false, decimals = 0, suffix = "", prefix = "" }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(end * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [start, end, duration]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
