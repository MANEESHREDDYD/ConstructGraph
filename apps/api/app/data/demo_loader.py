import json
import os
from typing import Dict, Any
from app.domain.models import CommandCenterPayload, Project, Risk, Obligation, Claim, RFI, Submittal, ScheduleActivity, ProcurementItem, RecommendedAction, GraphNode, GraphEdge

def load_demo_data() -> Dict[str, Any]:
    demo_data_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "data", "demo", "project.json")
    with open(demo_data_path, "r") as f:
        data = json.load(f)
    return data

def validate_and_load_command_center_payload() -> CommandCenterPayload:
    data = load_demo_data()
    
    # We validate each component to ensure it conforms to our strict typed domain models
    # We will raise errors if anything is invalid (e.g. missing source_evidence)
    try:
        project = Project(**data.get("project", {}))
        
        risks = [Risk(**r) for r in data.get("risks", [])]
        obligations = [Obligation(**o) for o in data.get("obligations", [])]
        claims = [Claim(**c) for c in data.get("claims", [])]
        
        # Validate that project summary and recommended actions exist
        if not project:
            raise ValueError("Project summary is missing.")
            
        recommended_actions_raw = data.get("recommended_actions", [])
        if not recommended_actions_raw:
            raise ValueError("Recommended actions are missing.")
            
        recommended_actions = [RecommendedAction(**a) for a in recommended_actions_raw]
        
        procurement_blockers = [ProcurementItem(**p) for p in data.get("procurement_items", []) if p.get("risk_level") == "High"]
        
        schedule_activities_raw = data.get("schedule_activities", [])
        schedule_blockers = [ScheduleActivity(**s) for s in schedule_activities_raw if s.get("status") in ("Blocked", "At Risk")]
        
        # Compute metrics based on loaded data for the payload
        high_risk_count = sum(1 for r in risks if r.severity == "High")
        
        rfis = [RFI(**r) for r in data.get("rfis", [])]
        open_rfis = sum(1 for r in rfis if r.status == "Open")
        
        submittals = [Submittal(**s) for s in data.get("submittals", [])]
        overdue_submittals = sum(1 for s in submittals if s.status == "Overdue")
        
        active_claims = len(claims)
        
        metrics = {
            "high_risk_count": high_risk_count,
            "open_rfis": open_rfis,
            "overdue_submittals": overdue_submittals,
            "active_claims": active_claims
        }
        
        pending_obligations = [o for o in obligations if o.due_date] # Can refine status filtering if we add status to Obligation
        
        # Validated graph edges
        edges = [GraphEdge(**e) for e in data.get("graph_edges", [])]
        
        # Normalization and deduplication of graph nodes happens in service, but we'll extract them here
        nodes_dict = {}
        for e in edges:
            nodes_dict[e.source] = GraphNode(id=e.source)
            nodes_dict[e.target] = GraphNode(id=e.target)
            
        graph = {
            "nodes": [n.model_dump() for n in nodes_dict.values()],
            "edges": [e.model_dump() for e in edges]
        }
        
        payload = CommandCenterPayload(
            project=project,
            metrics=metrics,
            risks=risks,
            obligations=pending_obligations,
            claims=claims,
            procurement_blockers=procurement_blockers,
            schedule_blockers=schedule_blockers,
            recommended_actions=recommended_actions,
            graph=graph
        )
        return payload

    except Exception as e:
        raise ValueError(f"Data validation failed: {str(e)}")
