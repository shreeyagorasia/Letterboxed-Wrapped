##### Terminal start guide: 
cd /Users/shreeyagorasia/PycharmProjects/Personal_Fun/Letterboxed_Wrapped_Root
ls
backend  frontend  .venv
conda deactivate
.venv/bin/python
    start backend: .venv/bin/python -m uvicorn backend.app.main:app --reload
    install new package: .venv/bin/python -m pip install requests
    run a script: .venv/bin/python backend/app/services/parser.py

server running : Uvicorn running on http://127.0.0.1:8000, stop by CTRL C
Restart surver: .venv/bin/python -m uvicorn backend.app.main:app --reload

Phase 1.0 – Infrastructure
- Project structure
- Virtual environment
- FastAPI running

Phase 1.1 – Data plumbing
- /upload endpoint
- ZIP upload works
- ZIP read in memory
- watched.csv successfully parsed
- Row count returned

Phase 1.2
- Move all ZIP + CSV logic out of the route and into services/parser.py.
- Read files watched, diary, ratings, watchlist 
- normalise columns, return dictionary of data frames 

Phase 1.3 
- Data frames into insights 

Phase 1.4
- Back in wrapped.py, your route becomes orchestration only:
- dfs = parse_letterboxd_zip(contents)
- stats = compute_basic_stats(dfs)
- return stats

    Basic stats
    - total movies watched
    - diary entries
    - ratings count
    - watchlist size
    Behavioural stats
    - total rewatch count
    - most rewatched movie
    - comfort movies (≥3 watches)
Time-based stats
    - busiest month
    - number of movies watched that month

Phase 2 
- front end 

Phase 3
- IMBD
- Genre clustering 
- AI summary wrapped
