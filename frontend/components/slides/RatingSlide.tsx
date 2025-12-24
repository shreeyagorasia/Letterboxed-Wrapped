import { RatingPersonality } from "../../types/wrapped";

export default function RatingSlide({ stats }: { stats: RatingPersonality }) {
  if (!stats?.persona) return null;

  const entries = Object.entries(stats.distribution || {});
  const average = stats.average_rating ?? "—";
  const generousPct = stats.high_rating_percentage ?? "—";

  return (
    <div style={{ textAlign: "center", maxWidth: 780 }}>
      <h2 style={{ opacity: 0.7, marginBottom: "0.5rem" }}>
        Rating vibe check
      </h2>
      <h1 style={{ fontSize: "3.4rem", margin: "0.6rem 0" }}>
        {stats.persona}
      </h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.85 }}>
        Average rating {average} ⭐ — {generousPct}% 4.5+ ratings.
      </p>

      {entries.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "0.75rem",
            marginTop: "1.6rem",
          }}
        >
          {entries.map(([rating, count]) => (
            <div
              key={rating}
              style={{
                padding: "0.9rem",
                borderRadius: 12,
                background: "#191a1e",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                {rating}⭐
              </div>
              <div style={{ opacity: 0.75 }}>{count} ratings</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
