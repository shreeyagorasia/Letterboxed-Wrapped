import pandas as pd
import re
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
# Cache
# --------------------
_movies_df = None


# --------------------
# Normalisation
# --------------------
def normalise_title(title: str) -> str:
    if not isinstance(title, str):
        return ""

    title = title.lower()
    title = re.sub(r"\(\d{4}\)", "", title)  # remove year e.g. (2012)
    title = re.sub(r"&", "and", title)
    title = re.sub(r"[^a-z0-9 ]", "", title)  # remove punctuation
    title = re.sub(r"\s+", " ", title)        # collapse spaces
    return title.strip()

# --------------------
# Load IMDb movies
# --------------------
def load_imdb_movies() -> pd.DataFrame:
    """Load IMDb movies parquet once and cache it."""
    global _movies_df

    if _movies_df is None:
        df = pd.read_parquet(IMDB_MOVIES_PATH)

        # 🔑 Ensure title_norm exists and is correct
        if "title_norm" not in df.columns:
            df["title_norm"] = df["primaryTitle"].astype(str).apply(normalise_title)

        _movies_df = df

    return _movies_df


# --------------------
# Movie matching
# --------------------
def match_movies_by_title(data: pd.DataFrame | pd.Series) -> pd.DataFrame:
    """
    Match Letterboxd watched rows OR title Series to IMDb rows.
    - If DataFrame: uses title + year disambiguation
    - If Series: uses title only
    """
    imdb = load_imdb_movies().copy()

    # --------------------
    # Handle input
    # --------------------
    if isinstance(data, pd.Series):
        titles = data.dropna().astype(str)
        years = None
    else:
        title_col = "name" if "name" in data.columns else data.columns[0]
        titles = data[title_col].dropna().astype(str)
        years = pd.to_numeric(data.get("year"), errors="coerce")

    titles_norm = titles.str.lower().str.strip()

    # --------------------
    # Candidate match
    # --------------------
    candidates = imdb[imdb["title_norm"].isin(titles_norm)].copy()
    if candidates.empty:
        return candidates

    # --------------------
    # Optional year disambiguation
    # --------------------
    if years is not None:
        tmp = pd.DataFrame({
            "title_norm": titles_norm.values,
            "watched_year": years.values
        }).dropna(subset=["title_norm"]).drop_duplicates("title_norm")

        candidates = candidates.merge(tmp, on="title_norm", how="left")

        candidates["startYear_num"] = pd.to_numeric(
            candidates["startYear"], errors="coerce"
        )
        candidates["year_diff"] = (
            candidates["startYear_num"] - candidates["watched_year"]
        ).abs()

        candidates["year_diff"] = candidates["year_diff"].fillna(10_000)

        candidates = candidates.sort_values(
            by=["title_norm", "year_diff"],
            ascending=[True, True]
        )

        candidates = candidates.drop_duplicates("title_norm", keep="first")

    return candidates[
        ["primaryTitle", "startYear", "runtimeMinutes", "genres", "title_norm"]
    ]

# --------------------
# Actor matching (unchanged, now works better)
# --------------------
def match_actors_for_titles(titles: pd.Series) -> pd.DataFrame:
    movies = load_imdb_movies()

    titles_norm = (
        titles.dropna()
        .astype(str)
        .apply(normalise_title)
        .unique()
    )

    movie_subset = movies[movies["title_norm"].isin(titles_norm)]
    tconsts = set(movie_subset["tconst"])

    if not tconsts:
        return pd.DataFrame(columns=["title_norm", "actor_name"])

    names = pd.read_csv(
        NAMES_PATH,
        sep="\t",
        na_values="\\N",
        dtype=str,
        usecols=["nconst", "primaryName"],
    )

    actor_rows = []

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
