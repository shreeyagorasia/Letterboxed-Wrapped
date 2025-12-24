import { Stats } from "../types/wrapped";

export const sampleStats: Stats = {
  counts: {
    watched_rows: 140,
    diary_rows: 112,
    ratings_rows: 90,
    watchlist_rows: 54,
  },
  watchlist: {
    items_in_watchlist: 54,
  },
  rewatches: {
    rewatch_count: 8,
    most_rewatched_movie: "Before Sunrise",
    most_rewatched_count: 3,
  },
  busiest_month: {
    busiest_month: "2025-10",
    movies_watched: 18,
  },
  consistency: {
    active_months: 11,
  },
  comfort_movies: {
    threshold: 2,
    count: 3,
    note: "Movies you returned to more than once",
    movies: [
      { title: "Before Sunrise", watches: 3 },
      { title: "Spirited Away", watches: 2 },
      { title: "The Social Network", watches: 2 },
    ],
  },
  genre_identity: {
    top_genre: "Drama",
    top_genres: {
      Drama: 42,
      Thriller: 18,
      Romance: 14,
      Crime: 11,
      Indie: 9,
    },
    top_genre_percentage: 42,
  },
  runtime: {
    total_minutes: 13800,
    total_hours: 230,
    average_runtime: 125,
  },
  release_year_bias: {
    median_year: 2016,
    modern_percentage: 62.5,
  },
  rating_personality: {
    average_rating: 3.8,
    high_rating_percentage: 28.5,
    persona: "Balanced reviewer",
    distribution: {
      "2.5": 6,
      "3.0": 14,
      "3.5": 20,
      "4.0": 28,
      "4.5": 15,
      "5.0": 7,
    },
  },
};
