export default function SlideNav({
  current,
  total,
  onNext,
  onPrev,
}: {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 32,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 48px",
      }}
    >
      <button
        onClick={onPrev}
        disabled={current === 0}
        style={{
          fontSize: "1.25rem",
          padding: "16px 28px",
          borderRadius: 999,
          opacity: current === 0 ? 0.3 : 1,
        }}
      >
        ← Prev
      </button>

      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          opacity: 0.8,
        }}
      >
        {current + 1} / {total}
      </div>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{
          fontSize: "1.25rem",
          padding: "16px 28px",
          borderRadius: 999,
          opacity: current === total - 1 ? 0.3 : 1,
        }}
      >
        Next →
      </button>
    </div>
  );
}
