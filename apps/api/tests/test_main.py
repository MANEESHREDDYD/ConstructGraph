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
