export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ padding: 24, borderRadius: 16, background: "#222" }}>
      <h2 style={{ fontSize: "3rem" }}>{value}</h2>
      <p>{label}</p>
    </div>
  );
}
