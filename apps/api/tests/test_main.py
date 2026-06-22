import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.domain.models import CommandCenterPayload, Project
import json
from unittest.mock import patch
import app.data.demo_loader as demo_loader

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "ConstructGraph API is running"}

def test_get_project():
    response = client.get("/api/demo/project")
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert "name" in data

def test_get_command_center():
    response = client.get("/api/demo/command-center")
    assert response.status_code == 200
    data = response.json()
    assert "project" in data
    assert "metrics" in data
    assert "risks" in data

def test_get_graph_no_duplicates():
    response = client.get("/api/demo/graph")
    assert response.status_code == 200
    data = response.json()
    nodes = data.get("nodes", [])
    node_ids = [n["id"] for n in nodes]
    assert len(node_ids) == len(set(node_ids)), "Graph nodes contain duplicates!"

def test_validation_failure_missing_evidence():
    # Load actual data
    original_data = demo_loader.load_demo_data()
    bad_data = json.loads(json.dumps(original_data)) # deep copy
    
    # Remove source_evidence from the first risk to trigger validation failure
    if bad_data["risks"]:
        bad_data["risks"][0].pop("source_evidence", None)
        
    with patch("app.data.demo_loader.load_demo_data", return_value=bad_data):
        response = client.get("/api/demo/command-center")
        assert response.status_code == 500
        assert "Data validation failed" in response.json()["detail"]

def test_source_evidence_is_populated():
    response = client.get("/api/demo/command-center")
    assert response.status_code == 200
    data = response.json()
    
    def check_evidence(items, name):
        for item in items:
            assert "source_evidence" in item, f"Item in {name} is missing source_evidence"
            assert isinstance(item["source_evidence"], list), f"source_evidence in {name} is not a list"
            assert len(item["source_evidence"]) > 0, f"source_evidence in {name} is empty"

    check_evidence(data["risks"], "risks")
    check_evidence(data["claims"], "claims")
    check_evidence(data["obligations"], "obligations")
    check_evidence(data["schedule_blockers"], "schedule_blockers")
    check_evidence(data["procurement_blockers"], "procurement_blockers")
    check_evidence(data["recommended_actions"], "recommended_actions")
