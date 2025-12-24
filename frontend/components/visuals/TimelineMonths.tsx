export default function TimelineMonths({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        gap: "0.75rem",
        alignItems: "end",
      }}
    >
      {entries.map(([month, count]) => (
        <div key={month} style={{ textAlign: "center" }}>
          <div
            style={{
              height: `${(count / max) * 120}px`,
              background: "linear-gradient(180deg, #00bfff, #0e1a28)",
              borderRadius: 10,
              marginBottom: 6,
            }}
          />
          <div style={{ opacity: 0.75 }}>{month}</div>
          <div style={{ fontWeight: 600 }}>{count}</div>
        </div>
      ))}
    </div>
  );
}
