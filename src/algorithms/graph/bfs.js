// src/algorithms/graph/bfs.js
export function* bfs(graph, start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    yield { visited: Array.from(visited) };

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
}
