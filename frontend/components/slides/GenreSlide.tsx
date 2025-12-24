import GenreStack from "../visuals/GenreStack";

type Genre = {
  label: string;
  value: number;
};

type Props = {
  headline: string;
  topGenre?: string;
  percentage?: number;
  genres?: Genre[];
};

export default function GenreSlide({
  headline,
  topGenre,
  percentage,
  genres,
}: Props) {
  const hasGenres = Array.isArray(genres) && genres.length > 0;

  const safeGenre = topGenre && topGenre.length > 0 ? topGenre : "Movies";
  const safePercentage =
    typeof percentage === "number" ? Math.round(percentage) : null;

  return (
    <div style={{ textAlign: "center", maxWidth: 900 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7, marginBottom: "1rem" }}>
        {headline}
      </h2>

      {/* Hero genre */}
      <h1 style={{ fontSize: "4rem", margin: "0.2rem 0" }}>
        {safeGenre}
      </h1>

      {/* Narrative */}
      <p style={{ fontSize: "1.3rem", opacity: 0.85 }}>
        {hasGenres && safePercentage !== null ? (
          safePercentage >= 30 ? (
            <>
              <strong>{safePercentage}%</strong> of your watches —
              a clear favourite.
            </>
          ) : (
            <>
              <strong>{safePercentage}%</strong> of your watches —
              you had pretty eclectic taste.
            </>
          )
        ) : (
          <>You watched a little bit of everything.</>
        )}
      </p>

      {/* Visual */}
      {hasGenres && (
        <div style={{ marginTop: "3rem" }}>
          <GenreStack genres={genres} />
        </div>
      )}
    </div>
  );
}
