export default function ClosingSlide({ text }: { text: string }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 720 }}>
      <h2 style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>
        That’s a wrap! 🎞️
      </h2>
      <p style={{ fontSize: "1.25rem", opacity: 0.8 }}>{text}</p>
    </div>
  );
}
