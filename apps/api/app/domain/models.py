from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class Project(BaseModel):
    id: str
    name: str
    phase: str
    health_score: int
    cost_exposure: int
    schedule_exposure_days: int
    evidence_completeness_score: int

class Risk(BaseModel):
    id: str
    title: str
    severity: Literal["High", "Medium", "Low"]
    probability: Literal["High", "Medium", "Low"]
    financial_exposure: int
    schedule_exposure_days: int
    affected_party: str
    source_evidence: List[str] = Field(..., min_length=1)
    recommended_action: str
    status: str

class Obligation(BaseModel):
    id: str
    obligation: str
    due_date: str
    risk_level: Literal["High", "Medium", "Low"]
    source_evidence: List[str] = Field(..., min_length=1)

class Claim(BaseModel):
    id: str
    title: str
    cost_impact: int
    schedule_impact_days: int
    evidence_completeness_score: int
    missing_evidence_checklist: List[str]
    source_evidence: List[str] = Field(..., min_length=1)

class RFI(BaseModel):
    id: str
    title: str
    status: str

class Submittal(BaseModel):
    id: str
    title: str
    status: str

class ScheduleActivity(BaseModel):
    id: str
    name: str
    start_date: str
    end_date: str
    status: str
    source_evidence: List[str] = Field(..., min_length=1)

class ProcurementItem(BaseModel):
    id: str
    name: str
    supplier: str
    lead_time_weeks: int
    required_on_site_date: str
    forecast_delivery_date: str
    risk_level: Literal["High", "Medium", "Low"]
    source_evidence: List[str] = Field(..., min_length=1)

class RecommendedAction(BaseModel):
    id: str
    title: str
    priority: Literal["High", "Medium", "Low"]
    type: str
    source_evidence: List[str] = Field(..., min_length=1)

class GraphNode(BaseModel):
    id: str

class GraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class GraphPayload(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

class CommandCenterMetrics(BaseModel):
    high_risk_count: int
    open_rfis: int
    overdue_submittals: int
    active_claims: int

class CommandCenterPayload(BaseModel):
    project: Project
    metrics: CommandCenterMetrics
    risks: List[Risk]
    obligations: List[Obligation]
    claims: List[Claim]
    procurement_blockers: List[ProcurementItem]
    schedule_blockers: List[ScheduleActivity]
    recommended_actions: List[RecommendedAction]
    graph: GraphPayload
