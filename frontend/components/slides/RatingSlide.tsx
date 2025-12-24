import RatingBlocks from "../visuals/RatingBlocks";
import { ratingVerdict, RatingBuckets } from "../../utils/ratings";

type Props = {
  buckets: RatingBuckets;
};

export default function RatingSlide({ buckets }: Props) {
  const verdict = ratingVerdict(buckets);

  return (
    <div style={{ textAlign: "center", maxWidth: 900 }}>
      {/* Headline */}
      <h2 style={{ opacity: 0.7 }}>
        How tough were you on your ratings?
      </h2>

      {/* Verdict */}
      <h1 style={{ fontSize: "3.8rem", margin: "0.5rem 0" }}>
        {verdict.title}
      </h1>

      <p style={{ fontSize: "1.3rem", opacity: 0.85 }}>
        {verdict.subline}
      </p>

      {/* Visual */}
      <RatingBlocks
        high={buckets.high}
        mid={buckets.mid}
        low={buckets.low}
      />
    </div>
  );
}

// Eventually this will be wired here:
// utils/slideFactory.ts