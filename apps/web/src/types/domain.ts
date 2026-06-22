export interface Project {
  id: string;
  name: string;
  phase: string;
  health_score: number;
  cost_exposure: number;
  schedule_exposure_days: number;
  evidence_completeness_score: number;
}

export interface Risk {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  financial_exposure: number;
  schedule_exposure_days: number;
  affected_party: string;
  source_evidence: string[];
  recommended_action: string;
  status: string;
}

export interface Obligation {
  id: string;
  obligation: string;
  due_date: string;
  risk_level: 'High' | 'Medium' | 'Low';
  source_evidence: string[];
}

export interface Claim {
  id: string;
  title: string;
  cost_impact: number;
  schedule_impact_days: number;
  evidence_completeness_score: number;
  missing_evidence_checklist: string[];
  source_evidence: string[];
}

export interface ScheduleActivity {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  source_evidence: string[];
}

export interface ProcurementItem {
  id: string;
  name: string;
  supplier: string;
  lead_time_weeks: number;
  required_on_site_date: string;
  forecast_delivery_date: string;
  risk_level: 'High' | 'Medium' | 'Low';
  source_evidence: string[];
}

export interface RecommendedAction {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  type: string;
  source_evidence: string[];
}

export interface GraphNode {
  id: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface GraphPayload {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface CommandCenterMetrics {
  high_risk_count: number;
  open_rfis: number;
  overdue_submittals: number;
  active_claims: number;
}

export interface CommandCenterPayload {
  project: Project;
  metrics: CommandCenterMetrics;
  risks: Risk[];
  obligations: Obligation[];
  claims: Claim[];
  procurement_blockers: ProcurementItem[];
  schedule_blockers: ScheduleActivity[];
  recommended_actions: RecommendedAction[];
  graph: GraphPayload;
}
