export default function OpeningSlide({ text }: { text: string }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 800 }}>
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        Welcome to Your Letterboxed Wrapped
      </h1>
      <p style={{ fontSize: "1.5rem", opacity: 0.8 }}>
        {text}
      </p>
    </div>
  );
}