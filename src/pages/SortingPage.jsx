import { useState } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { insertionSort } from '../algorithms/sorting/insertionSort';
import SortingVisualiser from '../components/SortingVisualiser';

const algorithms = {
  bubble: bubbleSort,
  insertion: insertionSort,
};

export default function SortingPage() {
  const [selected, setSelected] = useState('bubble');

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Sorting Algorithms</h1>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="bubble">Bubble Sort</option>
        <option value="insertion">Insertion Sort</option>
      </select>
      <SortingVisualiser algorithm={algorithms[selected]} />
    </div>
  );
}