import { useEffect, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  durationMs?: number;
};

export default function AnimatedNumber({ value, suffix = "", durationMs = 800 }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value, durationMs]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
