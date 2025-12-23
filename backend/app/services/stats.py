import pandas as pd


def _get_first_existing_col(df: pd.DataFrame, candidates: list[str]) -> str | None:
    """Return the first column name that exists in df, else None."""
    for c in candidates:
        if c in df.columns:
            return c
    return None


def _safe_len(df: pd.DataFrame | None) -> int:
    return int(len(df)) if df is not None else 0


def compute_basic_stats(dfs: dict) -> dict:
    """
    dfs keys expected: watched, diary, ratings, watchlist (any may be missing)
    Returns JSON-serialisable dict of stats.
    """
    watched = dfs.get("watched")
    diary = dfs.get("diary")
    ratings = dfs.get("ratings")
    watchlist = dfs.get("watchlist")

    # ------------------
    # Basic counts
    # ------------------
    result = {
        "counts": {
            "watched_rows": _safe_len(watched),
            "diary_rows": _safe_len(diary),
            "ratings_rows": _safe_len(ratings),
            "watchlist_rows": _safe_len(watchlist),
        }
    }

    # ------------------
    # Watchlist stats
    # ------------------
    result["watchlist"] = {
        "items_in_watchlist": _safe_len(watchlist),
    }

    # ------------------
    # Rewatch stats
    # ------------------
    rewatch_stats = {
        "rewatch_count": 0,
        "most_rewatched_movie": None,
        "most_rewatched_count": 0,
    }

    if diary is not None and len(diary) > 0:
        title_col = _get_first_existing_col(diary, ["name", "title"])

        if title_col:
            watch_counts = diary[title_col].value_counts()

            # Total rewatches = total diary entries minus first-time watches
            rewatch_stats["rewatch_count"] = int(
                watch_counts.sum() - watch_counts.count()
            )

            # Most rewatched movie
            most_watched_count = int(watch_counts.max())

            if most_watched_count > 1:
                rewatch_stats["most_rewatched_movie"] = watch_counts.idxmax()
                rewatch_stats["most_rewatched_count"] = most_watched_count

    result["rewatches"] = rewatch_stats

    # ------------------
    # Busiest month stats
    # ------------------
    busiest_month_stats = {
        "busiest_month": None,
        "movies_watched": 0,
    }

    if diary is not None and len(diary) > 0:
        date_col = _get_first_existing_col(diary, ["date", "watched_date"])

        if date_col:
            # Convert to datetime safely
            diary_dates = pd.to_datetime(diary[date_col], errors="coerce")

            # Drop rows with invalid dates
            valid_dates = diary_dates.dropna()

            if not valid_dates.empty:
                # Group by year-month
                month_counts = (
                    valid_dates
                    .dt.to_period("M")
                    .value_counts()
                    .sort_index()
                )

                # Find busiest month
                busiest_period = month_counts.idxmax()
                busiest_count = int(month_counts.max())

                busiest_month_stats["busiest_month"] = str(busiest_period)
                busiest_month_stats["movies_watched"] = busiest_count

    result["busiest_month"] = busiest_month_stats

    return result

