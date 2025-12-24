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

  // Always add genre slide if genre_identity exists at all
  if (stats.genre_identity) {
    narratives.push({
      type: "genre",
      text: "What kind of movie person were you this year?",
    });
  }

  if (stats.runtime?.total_hours) {
    narratives.push({
      type: "time",
      text: `You spent ${stats.runtime.total_hours} hours watching movies.`,
    });
  }

  if (stats.rating_personality?.persona) {
    narratives.push({
      type: "ratings",
      text: "How tough were you on your ratings?",
    });
  }

  if ((stats.rewatches?.rewatch_count ?? 0) > 0) {
    narratives.push({
      type: "rewatch",
      text: "",
    });
  }

  narratives.push({
    type: "closing",
    text: "That was your movie year. Ready to do it again?",
  });

  return narratives;
}
