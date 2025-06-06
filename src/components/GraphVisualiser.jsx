// src/components/GraphVisualizer.jsx
import React, { useState } from 'react';

export default function GraphVisualizer({ algorithm }) {
  const [graph, setGraph] = useState(generateSampleGraph());
  const [visited, setVisited] = useState([]);

  const runAlgorithm = async () => {
    const generator = algorithm(graph, 0); // assume start from node 0
    for (let step of generator) {
      setVisited(step.visited);
      await new Promise((r) => setTimeout(r, 500));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {graph.map((_, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${
              visited.includes(idx) ? 'bg-green-500' : 'bg-gray-700'
            }`}
          >
            {idx}
          </div>
        ))}
      </div>
      <button onClick={runAlgorithm} className="bg-blue-600 text-white px-4 py-2 rounded">
        Start
      </button>
    </div>
  );
}

function generateSampleGraph() {
  // Adjacency list for sample graph with 6 nodes
  return {
    0: [1, 2],
    1: [0, 3],
    2: [0, 4],
    3: [1, 5],
    4: [2],
    5: [3],
  };
}
