import { WatchlistStats } from "../../types/wrapped";

export default function WatchlistSlide({ stats }: { stats: WatchlistStats }) {
  if (!stats) return null;

  return (
    <div style={{ textAlign: "center", maxWidth: 720 }}>
      <h2 style={{ opacity: 0.7, marginBottom: "0.5rem" }}>
        The never-ending queue
      </h2>
      <h1 style={{ fontSize: "3.4rem", margin: "0.6rem 0" }}>
        {stats.items_in_watchlist} films
      </h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.85 }}>
        Plenty to look forward to next year.
      </p>
    </div>
  );
}
