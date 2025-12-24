import React from "react";

type SlideNavProps = {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
};

export default function SlideNav({
  current,
  total,
  onNext,
  onPrev,
}: SlideNavProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        padding: "0 32px",
        opacity: 0.8,
      }}
    >
      <button onClick={onPrev} disabled={current === 0}>
        ← Prev
      </button>

      <div>
        {current + 1} / {total}
      </div>

      <button onClick={onNext} disabled={current === total - 1}>
        Next →
      </button>
    </div>
  );
}
