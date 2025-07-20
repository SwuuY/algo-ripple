import React, { useState } from 'react';
import GraphVisualiser from '../components/GraphVisualiser';




export default function GraphPage() {
  const [algorithm, setAlgorithm] = useState('bfs');

  useEffect(() => {
    document.title = 'AlgoRipple - Graph';
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Graph Algorithms</h1>

      <div className="flex justify-center mb-6">
        <select
          className="px-4 py-2 border rounded shadow"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bfs">Breadth-First Search</option>
          <option value="dfs">Depth-First Search</option>
          {/* Add more options like Dijkstra, A*, etc. */}
        </select>
      </div>

      <GraphVisualiser algorithm={algorithm} />
    </div>
  );
}
