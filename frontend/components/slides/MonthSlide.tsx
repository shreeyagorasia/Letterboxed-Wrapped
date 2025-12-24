import { BusiestMonth } from "../../types/wrapped";

export default function MonthSlide({ stats }: { stats: BusiestMonth }) {
  if (!stats?.busiest_month) return null;

  return (
    <div style={{ textAlign: "center", maxWidth: 760 }}>
      <h2 style={{ opacity: 0.7, marginBottom: "0.5rem" }}>
        Your peak viewing window
      </h2>
      <h1 style={{ fontSize: "3.4rem", margin: "0.6rem 0" }}>
        {stats.busiest_month}
      </h1>
      <p style={{ fontSize: "1.25rem", opacity: 0.85 }}>
        You squeezed in {stats.movies_watched} films that month.
      </p>
    </div>
  );
}
