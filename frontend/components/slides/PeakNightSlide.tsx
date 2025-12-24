type PeakNight = {
  date: string;
  count: number;
};

export default function PeakNightSlide({ data }: { data: PeakNight }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 720 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7, marginBottom: "1rem" }}>
        Your movie habits in a moment
      </h2>

      {/* Big number */}
      <h1 style={{ fontSize: "4rem", margin: "0.2rem 0" }}>
        {data.count} films
      </h1>

      <p style={{ fontSize: "1.4rem", opacity: 0.85, marginBottom: "2.5rem" }}>
        in one day
      </p>

      {/* Calendar card */}
      <div
        style={{
        padding: "2.2rem 3rem",
        borderRadius: 28,
        background: "linear-gradient(135deg, #3ddc97 0%, #3b82f6 90%)",
        color: "white",
        boxShadow: `
            0 25px 60px rgba(59,130,246,0.35),
            0 0 0 1px rgba(255,255,255,0.25)
        `,
        }}
      >
        <div
          style={{
            fontSize: "1.1rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.75,
            marginBottom: "0.4rem",
          }}
        >
          Peak night
        </div>

        <div style={{ fontSize: "1.9rem", fontWeight: 600 }}>
          {data.date}
        </div>
      </div>

      {/* Subline */}
      <p style={{ marginTop: "2.5rem", fontSize: "1.2rem", opacity: 0.75 }}>
        At some point, the plan became “just one more”.
      </p>
    </div>
  );
}
