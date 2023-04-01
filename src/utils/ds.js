
export function dijkstra(graph, start) {
  const dist = [];
  const visited = [];
  const n = graph.length;

  for (let i = 0; i < n; i++) {
    dist[i] = Infinity;
    visited[i] = false;
  }

  dist[start] = 0;

  for (let i = 0; i < n - 1; i++) {
    const u = minDistance(dist, visited);

    visited[u] = true;

    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] != 0 && dist[u] != Infinity && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }

  return dist;
}

function minDistance(dist, visited) {
  let min = Infinity;
  let minIndex = -1;

  for (let v = 0; v < dist.length; v++) {
    if (!visited[v] && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }

  return minIndex;
}

// Example usage
const graph = [
  [0, 4, 0, 0, 0, 0],
  [4, 0, 8, 0, 0, 0],
  [0, 8, 0, 7, 0, 4],
  [0, 0, 7, 0, 9, 14],
  [0, 0, 0, 9, 0, 10],
  [0, 0, 4, 14, 10, 0],
];

const start = 0;

const result = dijkstra(graph, start);

console.log(result);
