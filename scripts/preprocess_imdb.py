print(">>> preprocess_imdb.py loaded", flush=True)

import os
from pathlib import Path
import pandas as pd

# -------- CONFIG --------

# TEMPORARY hard-coded path (we will fix later)
IMDB_TSV_PATH = Path(
    "/Users/shreeyagorasia/PycharmProjects/Personal_Fun/IMBD_required_datasets/title.basics.tsv")
OUTPUT_PATH = Path("backend/app/data/imdb_movies.parquet")
CHUNK_SIZE = 500_000
# ------------------------


def preprocess_imdb():
    
    print(">>> preprocess_imdb() started", flush=True)

    # ---- Guard: ensure IMDb path exists ----
    if not IMDB_TSV_PATH.exists():
        raise FileNotFoundError(
            "IMDb TSV not found.\n"
            "Please set the environment variable IMDB_TSV_PATH to the full path "
            "of title.basics.tsv.\n\n"
            "Example:\n"
            "export IMDB_TSV_PATH=\"/path/to/title.basics.tsv\""
        )

    print("Starting IMDb preprocessing...")
    
    print(">>> About to start reading TSV", flush=True)

    print(f"Reading from: {IMDB_TSV_PATH}")

    chunks = pd.read_csv(
        IMDB_TSV_PATH,
        sep="\t",
        na_values="\\N",
        chunksize=CHUNK_SIZE,
        dtype=str,
        low_memory=False
    )

    processed_chunks = []

    for i, chunk in enumerate(chunks, start=1):
        print(f"Processing chunk {i}...")

        # Keep only movies
        chunk = chunk[chunk["titleType"] == "movie"]

        # Keep only required columns
        chunk = chunk[
            ["primaryTitle", "startYear", "runtimeMinutes", "genres"]
        ]

        # Drop rows with missing runtime or genres
        chunk = chunk.dropna(subset=["runtimeMinutes", "genres"])

        # Convert runtime to integer
        chunk["runtimeMinutes"] = chunk["runtimeMinutes"].astype(int)

        # Normalise title for matching
        chunk["title_norm"] = (
            chunk["primaryTitle"]
            .str.lower()
            .str.strip()
        )

        processed_chunks.append(chunk)

    if not processed_chunks:
        raise RuntimeError("No valid movie rows found during IMDb preprocessing.")

    df = pd.concat(processed_chunks, ignore_index=True)

    print(f"Final movie count: {len(df)}")
    print(f"Saving to: {OUTPUT_PATH}")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(OUTPUT_PATH, index=False)

    print("IMDb preprocessing complete 🎉")


if __name__ == "__main__":
    
    preprocess_imdb()
