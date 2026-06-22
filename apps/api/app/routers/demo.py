from fastapi import APIRouter, HTTPException
from typing import List
from app.services.command_center_service import get_command_center_payload
from app.domain.models import Project, Risk, Obligation, Claim, CommandCenterPayload
from app.services.graph_service import normalize_and_deduplicate_graph

router = APIRouter(prefix="/api/demo", tags=["demo"])

@router.get("/project", response_model=Project)
def get_project():
    try:
        payload = get_command_center_payload()
        return payload.project
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/risks", response_model=List[Risk])
def get_risks():
    try:
        payload = get_command_center_payload()
        return payload.risks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/obligations", response_model=List[Obligation])
def get_obligations():
    try:
        payload = get_command_center_payload()
        return payload.obligations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/claims", response_model=List[Claim])
def get_claims():
    try:
        payload = get_command_center_payload()
        return payload.claims
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/graph")
def get_graph():
    try:
        from app.data.demo_loader import load_demo_data
        data = load_demo_data()
        edges = data.get("graph_edges", [])
        return normalize_and_deduplicate_graph(edges)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/command-center", response_model=CommandCenterPayload)
def get_command_center():
    try:
        payload = get_command_center_payload()
        # Ensure we run the deduplication logic on the graph before returning
        deduped_graph = normalize_and_deduplicate_graph(load_demo_data().get("graph_edges", []))
        payload_dict = payload.model_dump()
        payload_dict["graph"] = deduped_graph
        return payload_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def load_demo_data():
    from app.data.demo_loader import load_demo_data
    return load_demo_data()
