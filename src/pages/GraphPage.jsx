// src/pages/GraphPage.jsx
import { useState } from 'react';
import GraphVisualiser from '../components/GraphVisualiser';
import { bfs } from '../algorithms/graph/bfs';
import { dfs } from '../algorithms/graph/dfs';

const algorithms = {
  bfs,
  dfs,
};

export default function GraphPage() {
  const [selected, setSelected] = useState('bfs');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Graph Algorithms</h1>

      <select
        className="mb-4 border p-2 rounded"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="bfs">Breadth First Search</option>
        <option value="dfs">Depth First Search</option>
      </select>

      <GraphVisualiser algorithm={algorithms[selected]} />
    </div>
  );
}
