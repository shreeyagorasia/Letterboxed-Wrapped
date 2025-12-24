import RewatchList from "../visuals/RewatchList";
import type { RewatchResult } from "../../utils/rewatches";

export default function RewatchSlide({ data }: { data: RewatchResult }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 820 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7, marginBottom: "0.6rem" }}>
        {data.headline}
      </h2>

      {/* Hero title */}
      <h1 style={{ fontSize: "3.8rem", margin: "0.4rem 0" }}>
        {data.title}
      </h1>

      {/* Subline */}
      <p style={{ fontSize: "1.35rem", opacity: 0.85 }}>
        {data.subline}
      </p>

      {/* Accent divider (pop of colour) */}
      <div
        style={{
          width: 300,
          height: 6,
          margin: "2rem auto 3rem",
          borderRadius: 999,
          background: "linear-gradient(90deg, #00B021, #F27405)",
        }}
      />

      {/* List */}
      <RewatchList films={data.films} />
    </div>
  );
}
