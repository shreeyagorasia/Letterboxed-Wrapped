import StatCard from "../visuals/StatCard";
import { Counts } from "../../types/wrapped";

export default function StatSlide({ counts }: { counts: Counts }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 820 }}>
      <h2 style={{ opacity: 0.7, marginBottom: "1rem" }}>
        Quick totals
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard value={`${counts.diary_rows}`} label="Movies logged" />
        <StatCard value={`${counts.ratings_rows}`} label="Ratings" />
        <StatCard value={`${counts.watchlist_rows}`} label="Watchlist items" />
        <StatCard value={`${counts.watched_rows}`} label="Total entries" />
      </div>
    </div>
  );
}
