from fastapi import FastAPI
import json
import os

app = FastAPI(title="ConstructGraph OS API", version="0.1.0")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "ConstructGraph API is running"}

@app.get("/api/demo/project")
def get_demo_project():
    # Load demo data
    demo_data_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "demo", "project.json")
    try:
        with open(demo_data_path, "r") as f:
            data = json.load(f)
        return data
    except Exception as e:
        return {"error": str(e), "message": "Demo data not found or invalid"}
