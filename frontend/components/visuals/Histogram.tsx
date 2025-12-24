export default function Histogram({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  if (entries.length === 0) return null;

  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", justifyContent: "center" }}>
      {entries.map(([label, value]) => (
        <div key={label} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 32,
              height: `${(value / max) * 140}px`,
              background: "#00bfff",
              borderRadius: 8,
              marginBottom: 6,
            }}
          />
          <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>{label}</div>
          <div style={{ fontSize: "0.9rem" }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
