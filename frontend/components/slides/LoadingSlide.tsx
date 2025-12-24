export default function LoadingSlide() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "6px solid rgba(255,255,255,0.15)",
          borderTopColor: "#00bfff",
          animation: "spin 1s linear infinite",
        }}
      />
      <div style={{ fontSize: "1.2rem", opacity: 0.8 }}>
        Generating your Wrapped…
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
