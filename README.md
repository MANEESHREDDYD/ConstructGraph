# ConstructGraph OS

**Autonomous project-control intelligence for construction teams.**

ConstructGraph OS is a next-generation construction operating system designed to turn construction documents, schedules, emails, and field data into live risk, claim, and delivery intelligence. It connects project entities into a live Project Truth Graph.

## Mission
To build a product far beyond existing construction document-intelligence tools. The product acts like an AI project-control brain for construction teams, answering everyday critical questions:
“What can hurt this project, why, what proof do we have, what deadline is coming, what action should we take, and what should we draft now?”

## Architecture
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
  - Uses typed API adapters and `NEXT_PUBLIC_API_URL` for backend connections.
- **Backend**: FastAPI (Python), PostgreSQL / SQLite
  - Implements a Clean Architecture with typed Pydantic domain models, separate routers, and dedicated service layers (`command_center_service.py`, `graph_service.py`).
  - Includes robust payload validation ensuring strict schema adherence for graphs, claims, risks, and evidence tracing.
- **Intelligence Layer**: Rule-based MVP transitioning to advanced Graph / RAG AI systems.

## Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Git

### Frontend Setup
```bash
cd apps/web
npm install
npm run dev
```

### Backend Setup
```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Demo Project
Includes seed data for a synthetic project: **Riverside Medical Center Expansion — Phase 2**.
