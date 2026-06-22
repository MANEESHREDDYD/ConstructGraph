# Architecture: ConstructGraph OS

## Overview
ConstructGraph OS is built as a modern, decoupled web application. It uses a Next.js frontend, a FastAPI backend, and an intelligent data layer to build the Project Truth Graph.

## Components

### 1. Frontend (`apps/web`)
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Graph Visualization**: React Flow
- **Role**: Serve as the enterprise dashboard, presenting complex risk and claim data in a clean, executive-level interface.

### 2. Backend (`apps/api`)
- **Framework**: FastAPI
- **Language**: Python >= 3.10
- **Data Validation**: Pydantic
- **ORM**: SQLAlchemy
- **Database**: SQLite (MVP phase) transitioning to PostgreSQL
- **Role**: API gateway, business logic, data persistence, and deterministic risk/claim engine.

### 3. Intelligence Layer (Future)
- **Document Processing**: OCR, parsing
- **Embeddings & Search**: Vector databases for semantic search
- **Graph Database**: Neo4j or similar for deep relationship querying
- **LLM Integrations**: Automated extraction, verification, and draft generation (with human-in-the-loop approval).

## Data Flow
1. User or integration uploads project data (documents, schedules, etc.).
2. Data is parsed and entities are extracted.
3. Entities are inserted as nodes in the Project Truth Graph; relationships are mapped as edges.
4. Risk Engine evaluates nodes/edges to flag risks and update scores.
5. Frontend dashboards query the API for aggregated risk views and actionable insights.
