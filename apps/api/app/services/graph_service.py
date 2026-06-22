from typing import List, Dict, Any
from app.domain.models import GraphEdge, GraphNode

def normalize_and_deduplicate_graph(edges_data: List[dict]) -> Dict[str, Any]:
    """
    Takes a list of raw edge dictionaries.
    Validates them to GraphEdge domain models.
    Extracts unique nodes to avoid duplicates.
    Returns a dictionary with 'nodes' and 'edges'.
    """
    edges = []
    for edge_dict in edges_data:
        edges.append(GraphEdge(**edge_dict))
        
    unique_nodes = set()
    for edge in edges:
        unique_nodes.add(edge.source)
        unique_nodes.add(edge.target)
        
    nodes = [GraphNode(id=node_id).model_dump() for node_id in unique_nodes]
    
    return {
        "nodes": nodes,
        "edges": [edge.model_dump() for edge in edges]
    }
