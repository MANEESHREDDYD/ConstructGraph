# Roadmap: ConstructGraph OS

## Phase 0: Repository Initialization (Current)
- [x] Define Product Brief, Architecture, and Roadmap
- [x] Set up Monorepo structure
- [x] Initialize Next.js Frontend shell
- [x] Initialize FastAPI Backend shell
- [x] Create deterministic synthetic demo dataset

## Phase 1: Demo Dashboard
- Build Project Command Center UI
- Connect frontend to static/deterministic backend demo data
- Implement Risk, Obligation, and Claim cards

## Phase 2: Data Model
- Implement SQLite/PostgreSQL schemas for projects, documents, clauses, drawings, RFIs, submittals, risks, claims, and obligations.

## Phase 3: Risk Engine
- Implement deterministic rule-based risk scoring.
- Calculate schedule and cost impact probabilistically or deterministically.

## Phase 4: Obligation Engine
- Build Contract Obligation Register.
- Implement due date calculations and notice deadline detection.

## Phase 5: Claims Lab
- Generate potential claim packages and missing evidence checklists.

## Phase 6: Truth Graph Explorer
- Implement React Flow UI to visualize nodes and edges of the project graph.

## Phase 7: Document Intelligence Placeholder
- Implement document upload UI and prepare system for future RAG / LLM extraction.
