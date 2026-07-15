from fastapi import FastAPI

app = FastAPI(title="Mood Music Recommendation API")

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
