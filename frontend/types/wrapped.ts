// --------------------------------------------------
// BASIC COUNTS
// --------------------------------------------------

export type Counts = {
  watched_rows: number;
  diary_rows: number;
  ratings_rows: number;
  watchlist_rows: number;
};

// --------------------------------------------------
// WATCHLIST
// --------------------------------------------------

export type WatchlistStats = {
  items_in_watchlist: number;
};

// --------------------------------------------------
// GENRE
// --------------------------------------------------

export type GenreIdentity = {
  top_genre: string;
  top_genre_percentage: number;
  genres: Record<string, number>;
};

// --------------------------------------------------
// RUNTIME / TIME
// --------------------------------------------------

export type RuntimeStats = {
  total_minutes: number;
  total_hours: number;
  average_runtime: number;
};

// --------------------------------------------------
// RATINGS
// --------------------------------------------------

export type RatingPersonality = {
  average_rating: number | null;
  high_rating_percentage: number | null;
  persona: string | null;
  distribution: Record<string, number>;
};

// --------------------------------------------------
// REWATCH SLIDE (already slide-shaped)
// --------------------------------------------------

export type RewatchFilm = {
  title: string;
  count: number;
};

export type RewatchStats = {
  category: "comfort" | "explorer";
  headline: string;
  title: string;
  subline: string;
  films: RewatchFilm[];
};

// --------------------------------------------------
// PEAK NIGHT (Best date)
// --------------------------------------------------

export type PeakNight = {
  date: string;
  count: number;
};

// --------------------------------------------------
// ROOT STATS
// --------------------------------------------------

export type Stats = {
  counts: Counts;
  watchlist: WatchlistStats;
  genre_identity?: GenreIdentity;
  runtime?: RuntimeStats;
  rating_personality?: RatingPersonality;
  rewatches?: RewatchStats;
  peak_night?: PeakNight;
};

// --------------------------------------------------
// API RESPONSE
// --------------------------------------------------

export type WrappedResponse = {
  stats: Stats;
};
