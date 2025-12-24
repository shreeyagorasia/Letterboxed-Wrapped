import { ReactElement } from "react";
import GenreSlide from "../components/slides/GenreSlide";
import OpeningSlide from "../components/slides/OpeningSlide";
import TimeSlide from "../components/slides/TimeSlide";
import MonthSlide from "../components/slides/MonthSlide";
import RatingSlide from "../components/slides/RatingSlide";
import RewatchSlide from "../components/slides/RewatchSlide";
import WatchlistSlide from "../components/slides/WatchlistSlide";
import ClosingSlide from "../components/slides/ClosingSlide";
import StatSlide from "../components/slides/StatSlide";
import { buildNarratives } from "./narrativeSelect";
import { Stats } from "../types/wrapped";

/**
 * Convert stats into concrete slide render functions.
 * This keeps WrappedPlayer simple and declarative.
 */
export function buildSlides(stats: Stats): Array<() => ReactElement> {
  const narratives = buildNarratives(stats);
  const slides: Array<() => ReactElement> = [];

  narratives.forEach((n) => {
    if (n.type === "opening") {
      slides.push(() => <OpeningSlide text={n.text} />);
    } else if (n.type === "genre" && stats.genre_identity?.top_genre) {
      const g = stats.genre_identity;
      slides.push(() => (
        <GenreSlide
          headline={n.text}
          topGenre={g.top_genre ?? "Top Genre"}
          percentage={g.top_genre_percentage ?? 0}
          genres={
            g.top_genres
              ? Object.entries(g.top_genres).map(([label, value]) => ({
                  label,
                  value,
                }))
              : []
          }
        />
      ));
    } else if (n.type === "time") {
      slides.push(() => <TimeSlide stats={stats.runtime} />);
    } else if (n.type === "month") {
      slides.push(() => <MonthSlide stats={stats.busiest_month} />);
    } else if (n.type === "ratings") {
      slides.push(() => <RatingSlide stats={stats.rating_personality} />);
    } else if (n.type === "rewatch") {
      slides.push(() => <RewatchSlide stats={stats.rewatches} />);
    } else if (n.type === "watchlist") {
      slides.push(() => <WatchlistSlide stats={stats.watchlist} />);
    } else if (n.type === "closing") {
      slides.push(() => <ClosingSlide text={n.text} />);
    }
  });

  if (stats.counts) {
    slides.splice(1, 0, () => <StatSlide counts={stats.counts} />);
  }

  if (slides.length === 0) {
    slides.push(() => <ClosingSlide text="Upload a Letterboxd export to begin." />);
  }

  return slides;
}
