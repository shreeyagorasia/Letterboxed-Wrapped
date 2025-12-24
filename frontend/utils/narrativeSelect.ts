import { Narrative, Stats } from "../types/wrapped";

export function buildNarratives(stats: Stats): Narrative[] {
  const narratives: Narrative[] = [];
  const totalMovies = stats.counts?.diary_rows ?? 0;

  if (totalMovies > 0) {
    narratives.push({
      type: "opening",
      text: `You logged ${totalMovies} movies this year.`,
    });
  }

  const topGenre = stats.genre_identity?.top_genre;
  const topGenrePct = stats.genre_identity?.top_genre_percentage;
  if (topGenre) {
    narratives.push({
      type: "genre",
      text: topGenrePct
        ? `${topGenre} dominated your watchlist (${topGenrePct}%).`
        : `${topGenre} was your go-to genre.`,
    });
  }

  const totalHours = stats.runtime?.total_hours;
  if (totalHours) {
    narratives.push({
      type: "time",
      text: `You spent ${totalHours} hours watching movies.`,
    });
  }

  const busiestMonth = stats.busiest_month?.busiest_month;
  const busiestCount = stats.busiest_month?.movies_watched;
  if (busiestMonth && busiestCount) {
    narratives.push({
      type: "month",
      text: `${busiestMonth} was your busiest month with ${busiestCount} films.`,
    });
  }

  const persona = stats.rating_personality?.persona;
  if (persona) {
    const avg = stats.rating_personality?.average_rating;
    narratives.push({
      type: "ratings",
      text: avg
        ? `You were a ${persona.toLowerCase()} — average rating ${avg}⭐.`
        : `You were a ${persona.toLowerCase()} this year.`,
    });
  }

  const rewatches = stats.rewatches?.rewatch_count ?? 0;
  if (rewatches > 0) {
    narratives.push({
      type: "rewatch",
      text: `You rewatched ${rewatches} films — comfort viewing unlocked.`,
    });
  }

  const watchlistCount = stats.watchlist?.items_in_watchlist ?? 0;
  if (watchlistCount > 0) {
    narratives.push({
      type: "watchlist",
      text: `You still have ${watchlistCount} films waiting on your watchlist.`,
    });
  }

  narratives.push({
    type: "closing",
    text: "That was your movie year. Ready to do it again?",
  });

  return narratives;
}
