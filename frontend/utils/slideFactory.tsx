import type { ReactElement } from "react";

import OpeningSlide from "../components/slides/OpeningSlide";
import GenreSlide from "../components/slides/GenreSlide";
import TimeSlide from "../components/slides/TimeSlide";
import RatingSlide from "../components/slides/RatingSlide";
import RewatchSlide from "../components/slides/RewatchSlide";
import WatchlistSlide from "../components/slides/WatchlistSlide";
import ClosingSlide from "../components/slides/ClosingSlide";
import PeakNightSlide from "../components/slides/PeakNightSlide";

import type { Stats } from "../types/wrapped";

export function buildSlides(stats: Stats): Array<() => ReactElement> {
  const slides: Array<() => ReactElement> = [];

  // OPTIONAL: Opening (keep if you want 7 slides; remove if you want exactly 6)
  slides.push(() => <OpeningSlide text="This was your year on Letterboxd." />);

  // 1) Genre
  if (
    stats.genre_identity &&
    stats.genre_identity.genres &&
    Object.keys(stats.genre_identity.genres).length > 0
  ) {
    const g = stats.genre_identity;

    const genres = Object.entries(g.genres).map(
      ([label, value]) => ({
        label,
        value,
      })
    );

    slides.push(() => (
      <GenreSlide
        headline="What kind of movie person were you this year?"
        topGenre={g.top_genre}
        percentage={g.top_genre_percentage}
        genres={genres}
      />
    ));
  }
  
  // 2) Time
  if (stats.runtime) {
    slides.push(() => <TimeSlide stats={stats.runtime} />);
  }

  // 3) Ratings (NO computeBuckets — just compute inline)
  if (stats.rating_personality) {
    const high = stats.rating_personality.high_rating_percentage ?? 0;
    const low = Math.min(100 - high, 20);
    const mid = Math.max(0, 100 - high - low);

    slides.push(() => <RatingSlide buckets={{ high, mid, low }} />);
  }

  // 4) Rewatches
  if (stats.rewatches) {
    slides.push(() => <RewatchSlide data={stats.rewatches as any} />);
    // If your Stats type already matches RewatchSlide's prop type,
    // remove "as any" and it will type-check cleanly.
  }

  // 5) Peak night (best date)
  if (stats.peak_night) {
    slides.push(() => <PeakNightSlide data={stats.peak_night} />);
  }


  // OPTIONAL: Watchlist (only if you want it)
  if (stats.watchlist) {
    slides.push(() => <WatchlistSlide stats={stats.watchlist} />);
  }

  // Closing (always)
  slides.push(() => <ClosingSlide text="That’s a wrap." />);

  return slides;
}
