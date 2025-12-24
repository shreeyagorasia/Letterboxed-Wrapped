import { RuntimeStats } from "../../types/wrapped";
import { motion } from "framer-motion";

export default function TimeSlide({ stats }: { stats: RuntimeStats }) {
  if (!stats?.total_minutes) return null;

  const totalMinutes = stats.total_minutes;
  const totalHours =
    stats.total_hours ??
    Math.round((totalMinutes / 60) * 10) / 10;

  const PUNCHLINES = [
  "No regrets. Just one more film.",
  "Sleep was optional. Movies weren’t.",
  "Time flies when you’re watching something good.",
  "Some people touch grass. You pressed play.",
  "Most of the movies were worth it (right?)",
  ];

  const punchline =
    PUNCHLINES[Math.floor(Math.random() * PUNCHLINES.length)];

  return (
    <div style={{ textAlign: "center", maxWidth: 760 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7, marginBottom: "0.6rem" }}>
        Time well spent
      </h2>

      {/* Hero */}
      <h1 style={{ fontSize: "4rem", margin: "0.4rem 0" }}>
        {totalMinutes.toLocaleString()} minutes
      </h1>

      {/* Conversion */}
      <p style={{ fontSize: "1.5 rem", opacity: 0.9 }}>
        That adds up to <strong>{totalHours} hours</strong> of movies.
      </p>

      {/* Punchline container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        style={{
          marginTop: "2.2rem",
          display: "inline-block",
          padding: "1rem 1.8rem",
          borderRadius: 999,
          background: "rgba(242, 116, 5, 0.15)", // Letterboxd orange tint
          border: "1px solid rgba(242, 116, 5, 0.35)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <span
          style={{
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "#F6B04C",
            letterSpacing: "0.01em",
          }}
        >
          {punchline}
        </span>
      </motion.div>
    </div>
  );
}
