export type Counts = {
  watched_rows: number;
  diary_rows: number;
  ratings_rows: number;
  watchlist_rows: number;
};

export type WatchlistStats = {
  items_in_watchlist: number;
};

export type RewatchStats = {
  rewatch_count: number;
  most_rewatched_movie: string | null;
  most_rewatched_count: number;
};

export type BusiestMonth = {
  busiest_month: string | null;
  movies_watched: number;
};

export type ConsistencyStats = {
  active_months: number;
};

export type ComfortMovie = {
  title: string;
  watches: number;
};

export type ComfortMovies = {
  threshold: number;
  count: number;
  movies: ComfortMovie[];
  note: string;
};

export type GenreIdentity = {
  top_genre?: string;
  top_genres?: Record<string, number>;
  top_genre_percentage?: number;
};

export type RuntimeStats = {
  total_minutes?: number;
  total_hours?: number;
  average_runtime?: number;
};

export type ReleaseYearBias = {
  median_year?: number;
  modern_percentage?: number;
};

export type RatingPersonality = {
  average_rating?: number | null;
  high_rating_percentage?: number | null;
  persona?: string | null;
  distribution: Record<string, number>;
};

export type Stats = {
  counts: Counts;
  watchlist: WatchlistStats;
  rewatches: RewatchStats;
  busiest_month: BusiestMonth;
  consistency: ConsistencyStats;
  comfort_movies: ComfortMovies;
  genre_identity: GenreIdentity;
  runtime: RuntimeStats;
  release_year_bias: ReleaseYearBias;
  rating_personality: RatingPersonality;
};

export type NarrativeType =
  | "opening"
  | "genre"
  | "time"
  | "ratings"
  | "rewatch"
  | "peak-night"
  | "watchlist"
  | "closing"
  | "counts"
  | "runtime"
  | "month"
  | "comfort"
  | "habit"
  | "taste";

export type Narrative = {
  type: NarrativeType;
  text: string;
};

export type WrappedResponse = {
  stats: Stats;
  narratives: Narrative[];
};
