import pandas as pd
import re
from datetime import datetime
from backend.app.services.imdb import match_movies_by_title

WRAPPED_YEAR = 2025


# --------------------------------------------------
# Helpers
# --------------------------------------------------
def normalise_title(title: str) -> str:
    if not isinstance(title, str):
        return ""

    title = title.lower()
    title = re.sub(r"\(\d{4}\)", "", title)  # remove year e.g. (2012)
    title = re.sub(r"&", "and", title)
    title = re.sub(r"[^a-z0-9 ]", "", title)  # remove punctuation
    title = re.sub(r"\s+", " ", title)        # collapse spaces
    return title.strip()

def _get_first_existing_col(df: pd.DataFrame, candidates: list[str]) -> str | None:
    for c in candidates:
        if c in df.columns:
            return c
    return None


def _safe_len(df: pd.DataFrame | None) -> int:
    return int(len(df)) if df is not None else 0


# --------------------------------------------------
# Main stats computation
# --------------------------------------------------

def compute_basic_stats(dfs: dict) -> dict:
    watched = dfs.get("watched")
    diary = dfs.get("diary")
    ratings = dfs.get("ratings")
    watchlist = dfs.get("watchlist")

    result: dict = {}

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
    # REWATCHES (for RewatchSlide)
    # --------------------------------------------------
    rewatch_count = 0
    most_rewatched_movie = None
    most_rewatched_count = 0

    if diary is not None and len(diary) > 0:
        title_col = _get_first_existing_col(diary, ["name", "title"])
        if title_col:
            counts = diary[title_col].value_counts()
            rewatch_count = int(counts.sum() - counts.count())

            if not counts.empty and counts.max() > 1:
                most_rewatched_movie = counts.idxmax()
                most_rewatched_count = int(counts.max())

    if rewatch_count > 0:
        result["rewatches"] = {
            "category": "comfort",
            "headline": "Did you go back for seconds?",
            "title": "Comfort Watcher",
            "subline": "Some films felt like home.",
            "films": (
                [{
                    "title": most_rewatched_movie,
                    "count": most_rewatched_count,
                }]
                if most_rewatched_movie
                else []
            ),
        }
    else:
        result["rewatches"] = {
            "category": "explorer",
            "headline": "Did you go back for seconds?",
            "title": "Explorer",
            "subline": "Every film was a first-time watch.",
            "films": [],
        }

    # --------------------------------------------------
    # PEAK NIGHT (Best date)
    # --------------------------------------------------
    peak_night = {"date": None, "count": 0}

    if diary is not None and len(diary) > 0:
        date_col = _get_first_existing_col(diary, ["date", "watched_date"])
        if date_col:
            dates = diary[date_col].dropna().dt.date
            date_counts = dates.value_counts()

            if not date_counts.empty:
                peak_night = {
                    "date": date_counts.idxmax().strftime("%A, %b %d"),
                    "count": int(date_counts.max()),
                }

    print("DEBUG diary rows after year filter:", len(diary))
    print("DEBUG diary unique (date, name) pairs:", diary.drop_duplicates(["date","name"]).shape[0])
    print("DEBUG diary unique dates:", diary["date"].nunique())

    result["peak_night"] = (
    peak_night if peak_night["count"] > 1 else None)


    # --------------------------------------------------
    # IMDb ENRICHMENT (GENRE + RUNTIME)
    # --------------------------------------------------
    genre_identity = None
    runtime_stats = None

    if diary is not None and len(diary) > 0:
        title_col = _get_first_existing_col(diary, ["name", "Name", "Title"])

        if title_col:
            titles = (
                diary[[title_col]]
                .dropna()
                .drop_duplicates()[title_col]
            )

            print(f"DEBUG: IMDb using diary title column → {title_col}")
            print(f"DEBUG: unique diary titles → {len(titles)}")

            imdb_matches = match_movies_by_title(titles)
        else:
            print("DEBUG: No usable title column in diary")
            imdb_matches = None

        if imdb_matches is not None and not imdb_matches.empty:
            print("DEBUG: IMDb matched rows:", len(imdb_matches))
            print("DEBUG: IMDb columns:", imdb_matches.columns.tolist())

            # -------- Genre --------
            if "genres" in imdb_matches.columns:
                genre_counts = (
                    imdb_matches["genres"]
                    .dropna()
                    .str.split(",")
                    .explode()
                    .str.strip()
                    .str.title()
                    .value_counts()
                )

                if not genre_counts.empty:
                    pct = ((genre_counts / genre_counts.sum()) * 100).round(1)
                    genre_identity = {
                        "top_genre": pct.idxmax(),
                        "top_genre_percentage": float(pct.max()),
                        "genres": pct.head(5).to_dict(),
                    }

            # -------- Runtime --------
            if "runtimeMinutes" in imdb_matches.columns:
                runtimes = pd.to_numeric(
                    imdb_matches["runtimeMinutes"], errors="coerce"
                ).dropna()

                if not runtimes.empty:
                    total = int(runtimes.sum())
                    runtime_stats = {
                        "total_minutes": total,
                        "total_hours": round(total / 60, 1),
                        "average_runtime": int(runtimes.mean()),
                    }

    result["genre_identity"] = genre_identity
    result["runtime"] = runtime_stats


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


