from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes, edges):
    from collections import defaultdict, deque

    graph = defaultdict(list)
    indegree = defaultdict(int)

    for edge in edges:
        graph[edge["source"]].append(edge["target"])
        indegree[edge["target"]] += 1

    queue = deque()

    for node in nodes:
        if indegree[node["id"]] == 0:
            queue.append(node["id"])

    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: dict):
    nodes = pipeline.get("nodes", [])
    edges = pipeline.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges)
    }