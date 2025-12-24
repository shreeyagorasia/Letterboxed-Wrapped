type Segment = {
  value: number;
  color: string;
  label?: string;
};

export default function DonutChart({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let current = 0;
  const gradientStops = segments
    .map((s) => {
      const start = (current / total) * 100;
      current += s.value;
      const end = (current / total) * 100;
      return `${s.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: `conic-gradient(${gradientStops})`,
          transform: "rotate(-90deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 32,
          borderRadius: "50%",
          background: "#0d0d12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
        }}
      >
        {segments[0]?.value ? `${Math.round((segments[0].value / total) * 100)}%` : "—"}
      </div>
    </div>
  );
}
