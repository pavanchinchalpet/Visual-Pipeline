from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeData(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = ""
    targetHandle: str = ""

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

class PipelineGraph:
    def __init__(self, nodes: List[NodeData], edges: List[EdgeData]):
        self.nodes = {node.id: node for node in nodes}
        self.adjacency_list = self._build_adjacency_list(edges)
    
    def _build_adjacency_list(self, edges: List[EdgeData]) -> Dict[str, List[str]]:
        adj_list = {node_id: [] for node_id in self.nodes.keys()}
        for edge in edges:
            if edge.source in adj_list:
                adj_list[edge.source].append(edge.target)
        return adj_list
    
    def is_dag(self) -> bool:
        """Check if the graph is a DAG using DFS cycle detection"""
        WHITE, GRAY, BLACK = 0, 1, 2
        colors = {node_id: WHITE for node_id in self.nodes.keys()}
        
        def dfs(node):
            if colors[node] == GRAY:  # Back edge found - cycle detected
                return False
            if colors[node] == BLACK:  # Already processed
                return True
            
            colors[node] = GRAY
            for neighbor in self.adjacency_list.get(node, []):
                if neighbor in colors and not dfs(neighbor):
                    return False
            colors[node] = BLACK
            return True
        
        for node_id in self.nodes.keys():
            if colors[node_id] == WHITE:
                if not dfs(node_id):
                    return False
        return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline_data: PipelineData):
    try:
        # Create graph representation
        graph = PipelineGraph(pipeline_data.nodes, pipeline_data.edges)
        
        # Analyze the pipeline
        num_nodes = len(pipeline_data.nodes)
        num_edges = len(pipeline_data.edges)
        is_dag = graph.is_dag()
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing pipeline: {str(e)}")
