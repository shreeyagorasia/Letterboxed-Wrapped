import zipfile
import io
import pandas as pd

FILES_WE_CARE_ABOUT = [
    "watched.csv",
    "diary.csv",
    "ratings.csv",
    "watchlist.csv",
]

def _clean_columns(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )
    return df


def parse_letterboxd_zip(file_bytes: bytes) -> dict:
    """
    Takes raw ZIP bytes from Letterboxd export
    Returns dict of pandas DataFrames
    """
    dfs = {}

    with zipfile.ZipFile(io.BytesIO(file_bytes)) as z:
        files_in_zip = z.namelist()

        for filename in FILES_WE_CARE_ABOUT:
            if filename in files_in_zip:
                with z.open(filename) as f:
                    df = pd.read_csv(f)
                    df = _clean_columns(df)
                    key = filename.replace(".csv", "")
                    dfs[key] = df

    return dfs
