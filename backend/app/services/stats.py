import pandas as pd
from datetime import datetime
from backend.app.services.imdb import (
    match_movies_by_title,
    match_actors_for_titles,
)

WRAPPED_YEAR = 2025


def _get_first_existing_col(df: pd.DataFrame, candidates: list[str]) -> str | None:
    for c in candidates:
        if c in df.columns:
            return c
    return None


def _safe_len(df: pd.DataFrame | None) -> int:
    return int(len(df)) if df is not None else 0


def compute_basic_stats(dfs: dict) -> dict:
    watched = dfs.get("watched")
    diary = dfs.get("diary")
    ratings = dfs.get("ratings")
    watchlist = dfs.get("watchlist")

    result = {}

    # --------------------------------------------------
    # YEAR FILTER (Wrapped window)
    # --------------------------------------------------
    if diary is not None and len(diary) > 0:
        date_col = _get_first_existing_col(diary, ["date", "watched_date"])
        if date_col:
            diary[date_col] = pd.to_datetime(diary[date_col], errors="coerce")
            diary = diary[
                (diary[date_col] >= datetime(WRAPPED_YEAR, 1, 1)) &
                (diary[date_col] <= datetime(WRAPPED_YEAR, 12, 31))
            ]

    # --------------------------------------------------
    # BASIC COUNTS (always available)
    # --------------------------------------------------
    result["counts"] = {
        "watched_rows": _safe_len(watched),
        "diary_rows": _safe_len(diary),
        "ratings_rows": _safe_len(ratings),
        "watchlist_rows": _safe_len(watchlist),
    }

    # --------------------------------------------------
    # WATCHLIST
    # --------------------------------------------------
    result["watchlist"] = {
        "items_in_watchlist": _safe_len(watchlist),
    }

    # --------------------------------------------------
    # REWATCH STATS
    # --------------------------------------------------
    rewatch_stats = {
        "rewatch_count": 0,
        "most_rewatched_movie": None,
        "most_rewatched_count": 0,
    }

    if diary is not None and len(diary) > 0:
        title_col = _get_first_existing_col(diary, ["name", "title"])
        if title_col:
            watch_counts = diary[title_col].value_counts()
            rewatch_stats["rewatch_count"] = int(
                watch_counts.sum() - watch_counts.count()
            )
            if watch_counts.max() > 1:
                rewatch_stats["most_rewatched_movie"] = watch_counts.idxmax()
                rewatch_stats["most_rewatched_count"] = int(watch_counts.max())

    result["rewatches"] = rewatch_stats

    # --------------------------------------------------
    # BUSIEST MONTH + CONSISTENCY
    # --------------------------------------------------
    busiest_month = {"busiest_month": None, "movies_watched": 0}
    consistency = {"active_months": 0}

    if diary is not None and len(diary) > 0:
        date_col = _get_first_existing_col(diary, ["date", "watched_date"])
        if date_col:
            months = diary[date_col].dropna().dt.to_period("M")
            month_counts = months.value_counts()

            if not month_counts.empty:
                busiest_month = {
                    "busiest_month": str(month_counts.idxmax()),
                    "movies_watched": int(month_counts.max()),
                }
                consistency["active_months"] = int(months.nunique())

    result["busiest_month"] = busiest_month
    result["consistency"] = consistency

    # --------------------------------------------------
    # COMFORT MOVIES (soft, UX-friendly)
    # --------------------------------------------------
    COMFORT_THRESHOLD = 2

    comfort_movies = {
        "threshold": COMFORT_THRESHOLD,
        "count": 0,
        "movies": [],
        "note": "Movies you returned to more than once",
    }

    if diary is not None and len(diary) > 0:
        title_col = _get_first_existing_col(diary, ["name", "title"])
        if title_col:
            counts = diary[title_col].value_counts()
            comfort_df = counts[counts >= COMFORT_THRESHOLD]

            comfort_movies["count"] = int(len(comfort_df))
            for title, count in comfort_df.items():
                comfort_movies["movies"].append({
                    "title": title,
                    "watches": int(count)
                })

    result["comfort_movies"] = comfort_movies

    # --------------------------------------------------
    # IMDb ENRICHMENT (Genres, Runtime, Release bias)
    # --------------------------------------------------
    genre_identity = {}
    runtime_stats = {}
    release_bias = {}

    if watched is not None and "Name" in watched.columns:
        imdb_matches = match_movies_by_title(watched["Name"])

        if not imdb_matches.empty:
            # Genres
            genre_counts = (
                imdb_matches["genres"]
                .str.split(",")
                .explode()
                .value_counts()
            )

            total = genre_counts.sum()
            top_genre = genre_counts.idxmax()

            genre_identity = {
                "top_genre": top_genre,
                "top_genres": genre_counts.head(5).to_dict(),
                "top_genre_percentage": round(
                    (genre_counts.max() / total) * 100, 1
                ),
            }

            # Runtime
            total_minutes = imdb_matches["runtimeMinutes"].sum()
            runtime_stats = {
                "total_minutes": int(total_minutes),
                "total_hours": round(total_minutes / 60, 1),
                "average_runtime": round(
                    imdb_matches["runtimeMinutes"].mean(), 1
                ),
            }

            # Release year bias
            years = pd.to_numeric(imdb_matches["startYear"], errors="coerce")
            if not years.dropna().empty:
                release_bias = {
                    "median_year": int(years.median()),
                    "modern_percentage": round(
                        (years >= 2015).mean() * 100, 1
                    ),
                }

    result["genre_identity"] = genre_identity
    result["runtime"] = runtime_stats
    result["release_year_bias"] = release_bias

    # --------------------------------------------------
    # RATING PERSONALITY + DISTRIBUTION
    # --------------------------------------------------
    rating_personality = {
        "average_rating": None,
        "high_rating_percentage": None,
        "persona": None,
        "distribution": {},
    }

    if ratings is not None and len(ratings) > 0:
        rating_col = _get_first_existing_col(ratings, ["rating"])
        if rating_col:
            ratings[rating_col] = pd.to_numeric(
                ratings[rating_col], errors="coerce"
            )
            valid = ratings[rating_col].dropna()

            if not valid.empty:
                avg = valid.mean()
                high_pct = (valid >= 4.5).mean() * 100

                if avg >= 4.0:
                    persona = "Generous rater"
                elif avg <= 3.0:
                    persona = "Tough critic"
                else:
                    persona = "Balanced reviewer"

                rating_personality.update({
                    "average_rating": round(avg, 2),
                    "high_rating_percentage": round(high_pct, 1),
                    "persona": persona,
                    "distribution": valid.value_counts().sort_index().to_dict(),
                })

    result["rating_personality"] = rating_personality


    # # --------------------------------------------------
    # # TOP ACTOR
    # # --------------------------------------------------
    # actor_stats = {
    #     "top_actor": None,
    #     "top_actors": {},
    # }

    # if watched is not None and "Name" in watched.columns:
    #     actor_matches = match_actors_for_titles(watched["Name"])

    #     if not actor_matches.empty:
    #         counts = actor_matches["actor_name"].value_counts()
    #         actor_stats = {
    #             "top_actor": counts.idxmax(),
    #             "top_actors": counts.head(5).to_dict(),
    #         }

    # result["actors"] = actor_stats
    # TODO:
    # Actor stats require IMDb title.principals + tconst in imdb_movies.parquet.
    # Disabled for now to avoid heavy preprocessing.

    return result
