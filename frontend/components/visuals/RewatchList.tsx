type Film = {
  title: string;
  count: number;
};

// Letterboxd-inspired accents
const ROW_STYLES = [
  {
    bg: "linear-gradient(135deg, rgba(242,116,5,0.50), rgba(242,116,5,0.20))",
    glow: "rgba(242,116,5,0.70)",
    emoji: "🎬",
  },
  {
    bg: "linear-gradient(135deg, rgba(0,176,33,0.50), rgba(0,176,33,0.20))",
    glow: "rgba(0,176,33,0.70)",
    emoji: "🍿",
  },
  {
    bg: "linear-gradient(135deg, rgba(77,163,255,0.50), rgba(77,163,255,0.20))",
    glow: "rgba(77,163,255,0.70)",
    emoji: "🎞️",
  },
];

export default function RewatchList({ films }: { films: Film[] }) {
  // Explorer case
  if (!films || films.length === 0) {
    return (
      <p
        style={{
          marginTop: "2rem",
          fontSize: "1.25rem",
          opacity: 0.7,
        }}
      >
        Every film was a first-time watch.
      </p>
    );
  }

  return (
    <div style={{ marginTop: "1rem", width: "100%", maxWidth: 560 }}>
      {films.map((film, i) => {
        const style = ROW_STYLES[i % ROW_STYLES.length];

        return (
          <div
            key={film.title}
            style={{
              padding: "1.2rem 1.6rem",
              marginBottom: "1.3rem",
              borderRadius: 22,
              background: style.bg,
              boxShadow: `0 18px 45px ${style.glow}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.25rem",
            }}
          >
            {/* Left: emoji + title */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{style.emoji}</span>
              <span style={{ fontWeight: 500 }}>{film.title}</span>
            </div>

            {/* Right: count */}
            <span
              style={{
                fontWeight: 700,
                opacity: 0.9,
                letterSpacing: "0.05em",
              }}
            >
              ×{film.count}
            </span>
          </div>
        );
      })}
    </div>
  );
}
