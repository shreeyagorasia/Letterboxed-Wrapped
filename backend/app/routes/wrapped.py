
from fastapi import APIRouter, UploadFile, File
from backend.app.services.parser import parse_letterboxd_zip
from backend.app.services.stats import compute_basic_stats


router = APIRouter()

@router.post("/upload")
async def upload_zip(file: UploadFile = File(...)):
    contents = await file.read()
    dfs = parse_letterboxd_zip(contents)
    stats = compute_basic_stats(dfs)
    return stats