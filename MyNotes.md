TERMINAL START GUIDE (BASELINE)

Project root:
cd /Users/shreeyagorasia/PycharmProjects/Personal_Fun/Letterboxed_Wrapped_Root

Check contents:
ls
Expected:
backend
frontend
scripts
.venv
README.md

Deactivate conda (important to avoid conflicts):
conda deactivate
Use venv Python explicitly:
.venv/bin/python

BACKEND COMMANDS (MOST USED)
Start backend server:
.venv/bin/python -m uvicorn backend.app.main:app --reload
Server running confirmation:
Uvicorn running on http://127.0.0.1:8000

Stop server:
CTRL + C
Restart server:
.venv/bin/python -m uvicorn backend.app.main:app --reload
Install new package:
.venv/bin/python -m pip install <package_name>
Example:
.venv/bin/python -m pip install requests
Run a standalone script:
.venv/bin/python scripts/preprocess_imdb.py

(Important: scripts are run from project root, not inside backend)

PHASE 1.0 – INFRASTRUCTURE (COMPLETED)
Project folder structure created
Virtual environment set up (.venv)
FastAPI installed
Uvicorn server running

/docs accessible at http://127.0.0.1:8000/docs

PHASE 1.1 – DATA PLUMBING (COMPLETED)
/upload endpoint created (POST)
Letterboxd ZIP upload works via /docs
ZIP read fully in memory
watched.csv parsed correctly
Row count returned in JSON response
Confirmed output example:
{
"total_movies": 95
}

PHASE 1.2 – PARSING LOGIC (COMPLETED)
    Moved all ZIP + CSV logic out of routes
    Created services/parser.py
    Read the following files from ZIP:
    watched.csv
    diary.csv
    ratings.csv
    watchlist.csv
    Normalised column names

Returned dictionary of pandas DataFrames:
{
"watched": df,
"diary": df,
"ratings": df,
"watchlist": df
}

PHASE 1.3 – STATS ENGINE (IN PROGRESS / PARTIAL)
DataFrames → insights using services/stats.py

Basic stats implemented:
    total movies watched
    diary entry count
    ratings count
    watchlist size

Behavioural stats planned:
    total rewatch count
    most rewatched movie
    comfort movies (≥ 3 watches)
    Time-based stats planned:
    busiest month
    number of movies watched that month

PHASE 1.4 – ROUTE SIMPLIFICATION (COMPLETED)
    wrapped.py responsibilities reduced to orchestration only:
    Flow:
    contents = await file.read()
    dfs = parse_letterboxd_zip(contents)
    stats = compute_basic_stats(dfs)
    return stats
    No business logic in routes.

PHASE 2 – FRONTEND (NOT STARTED)
    Planned:
    File upload UI
    Wrapped-style stat cards
    Simple visuals first, styling later

PHASE 3 – IMDB INTEGRATION (IN PROGRESS)
    IMDb title.basics.tsv downloaded locally (large file)
    Preprocessing script created in scripts/preprocess_imdb.py
    IMDb data filtered to movies only
    Kept fields:
        title
        year
        runtime
        genres
    Output saved as:
        backend/app/data/imdb_movies.parquet

    Important notes:
    IMDb TSV is NOT used at runtime
    Parquet file is generated once
    Parquet can be deleted and regenerated safely

Planned next:
services/imdb.py
load parquet once
runtime stats
genre stats
comfort genre
later: genre clustering + AI summary

KEY LESSONS / REMINDERS
Generated data folders (backend/app/data) can be safely deleted
Large datasets should be preprocessed once, not per request
Most early issues were filesystem / path related, not logic
Explicit paths > magic detection
Keep routes thin, logic in services