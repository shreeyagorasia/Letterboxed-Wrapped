import GenreStack from "../visuals/GenreStack";

export default function GenreSlide({
  headline,
  topGenre,
  percentage,
  genres,
}: {
  headline: string;
  topGenre: string;
  percentage: number;
  genres: { label: string; value: number }[];
}) {
  return (
    <div style={{ textAlign: "center", maxWidth: 900 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7, marginBottom: "1rem" }}>
        {headline}
      </h2>

      {/* Hero genre */}
      <h1 style={{ fontSize: "4rem", margin: "0.2rem 0" }}>
        {topGenre}
      </h1>

      {/* Narrative sentence */}
      <p style={{ fontSize: "1.3rem", opacity: 0.85 }}>
        <strong>A whopping {percentage}%</strong> of your watches —
        everything else was fighting for second place.
      </p>

      {/* Visual */}
      <div style={{ marginTop: "3rem" }}>
        <GenreStack genres={genres} />
      </div>
    </div>
  );
}
