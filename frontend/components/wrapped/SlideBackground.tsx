export default function SlideBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at 20% 20%, rgba(0, 191, 255, 0.18), transparent 35%), radial-gradient(circle at 80% 40%, rgba(255, 99, 132, 0.18), transparent 32%), #0b0b0f",
        zIndex: -1,
      }}
    />
  );
}
