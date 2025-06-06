export function* dfs(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    yield { visited: Array.from(visited) };

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}