import pandas as pd
from pathlib import Path

# --------------------
# Paths
# --------------------
IMDB_MOVIES_PATH = Path("backend/app/data/imdb_movies.parquet")

BASE_IMDB_PATH = Path(
    "/Users/shreeyagorasia/PycharmProjects/Personal_Fun/IMBD_required_datasets"
)
PRINCIPALS_PATH = BASE_IMDB_PATH / "title.principals.tsv"
NAMES_PATH = BASE_IMDB_PATH / "name.basics.tsv"

# --------------------
# Caches
# --------------------
_movies_df = None


def load_imdb_movies() -> pd.DataFrame:
    """Load IMDb movies parquet once and cache it."""
    global _movies_df
    if _movies_df is None:
        _movies_df = pd.read_parquet(IMDB_MOVIES_PATH)
    return _movies_df


def match_movies_by_title(titles: pd.Series) -> pd.DataFrame:
    """
    Given a Series of movie titles, return matched IMDb movie rows.
    """
    imdb = load_imdb_movies()

    titles_norm = (
        titles.dropna()
        .str.lower()
        .str.strip()
        .unique()
    )

    return imdb[imdb["title_norm"].isin(titles_norm)]


def match_actors_for_titles(titles: pd.Series) -> pd.DataFrame:
    """
    Return actors for ONLY the given movie titles.
    Streams title.principals.tsv instead of loading it fully.
    """
    movies = load_imdb_movies()

    titles_norm = (
        titles.dropna()
        .str.lower()
        .str.strip()
        .unique()
    )

    movie_subset = movies[movies["title_norm"].isin(titles_norm)]
    tconsts = set(movie_subset["tconst"])

    if not tconsts:
        return pd.DataFrame(columns=["title_norm", "actor_name"])

    # Load names (small file)
    names = pd.read_csv(
        NAMES_PATH,
        sep="\t",
        na_values="\\N",
        dtype=str,
        usecols=["nconst", "primaryName"],
    )

    actor_rows = []

    # Stream principals (huge file) in chunks
    for chunk in pd.read_csv(
        PRINCIPALS_PATH,
        sep="\t",
        na_values="\\N",
        dtype=str,
        usecols=["tconst", "nconst", "category", "ordering"],
        chunksize=500_000,
        low_memory=False,
    ):
        chunk = chunk[
            (chunk["tconst"].isin(tconsts)) &
            (chunk["category"].isin(["actor", "actress"]))
        ]

        chunk["ordering"] = pd.to_numeric(chunk["ordering"], errors="coerce")
        chunk = chunk[chunk["ordering"] <= 3]

        if not chunk.empty:
            actor_rows.append(chunk)

    if not actor_rows:
        return pd.DataFrame(columns=["title_norm", "actor_name"])

    principals = pd.concat(actor_rows, ignore_index=True)

    actors = principals.merge(names, on="nconst", how="left")
    actors = actors.merge(
        movie_subset[["tconst", "title_norm"]],
        on="tconst",
        how="left"
    )

    return actors[["title_norm", "primaryName"]].rename(
        columns={"primaryName": "actor_name"}
    )
