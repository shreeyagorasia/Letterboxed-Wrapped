export default function GenrePills({ genres }: { genres: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {genres.map((g) => (
        <span
          key={g}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background: "#222",
            fontSize: "0.9rem",
            opacity: 0.9,
          }}
        >
          {g}
        </span>
      ))}
    </div>
  );
}
