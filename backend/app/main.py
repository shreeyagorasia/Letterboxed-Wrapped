from fastapi import FastAPI
from backend.app.routes.wrapped import router as wrapped_router


app = FastAPI()

app.include_router(wrapped_router)

@app.get("/")
def root():
    return {"message": "Backend is alive"}