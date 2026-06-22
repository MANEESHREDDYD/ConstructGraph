from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI(title="ConstructGraph OS API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_data():
    demo_data_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "demo", "project.json")
    with open(demo_data_path, "r") as f:
        return json.load(f)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "ConstructGraph API is running"}

@app.get("/api/demo/project")
def get_demo_project():
    try:
        return get_data()
    except Exception as e:
        return {"error": str(e), "message": "Demo data not found or invalid"}

@app.get("/api/demo/command-center")
def get_command_center():
    try:
        data = get_data()
        
        # Calculate derived metrics
        high_risk_count = sum(1 for r in data.get("risks", []) if r.get("severity") == "High")
        open_rfis = sum(1 for r in data.get("rfis", []) if r.get("status") == "Open")
        overdue_submittals = sum(1 for s in data.get("submittals", []) if s.get("status") == "Overdue")
        active_claims = len(data.get("claims", []))
        
        # Upcoming notice deadlines
        deadlines = [o for o in data.get("obligations", []) if o.get("status") == "Pending"]
        
        return {
            "project": data.get("project", {}),
            "metrics": {
                "high_risk_count": high_risk_count,
                "open_rfis": open_rfis,
                "overdue_submittals": overdue_submittals,
                "active_claims": active_claims
            },
            "risks": data.get("risks", []),
            "obligations": deadlines,
            "claims": data.get("claims", []),
            "procurement_blockers": [p for p in data.get("procurement_items", []) if p.get("risk_level") == "High"],
            "schedule_blockers": [s for s in data.get("schedule_activities", []) if s.get("status") == "Blocked" or s.get("status") == "At Risk"],
            "recommended_actions": data.get("recommended_actions", []),
            "graph": {
                "nodes": [{"id": e["source"]} for e in data.get("graph_edges", [])] + [{"id": e["target"]} for e in data.get("graph_edges", [])],
                "edges": data.get("graph_edges", [])
            }
        }
    except Exception as e:
        return {"error": str(e), "message": "Failed to aggregate command center data"}
