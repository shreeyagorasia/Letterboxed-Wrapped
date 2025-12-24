import { RewatchStats } from "../../types/wrapped";

export default function RewatchSlide({ stats }: { stats: RewatchStats }) {
  if (!stats) return null;

  return (
    <div style={{ textAlign: "center", maxWidth: 720 }}>
      <h2 style={{ opacity: 0.7, marginBottom: "0.5rem" }}>
        Comfort viewing
      </h2>

      <h1 style={{ fontSize: "3.2rem", margin: "0.4rem 0" }}>
        {stats.rewatch_count} rewatches
      </h1>

      {stats.most_rewatched_movie && (
        <p style={{ fontSize: "1.25rem", opacity: 0.85 }}>
          You hit replay on <strong>{stats.most_rewatched_movie}</strong>{" "}
          {stats.most_rewatched_count} times.
        </p>
      )}
    </div>
  );
}
