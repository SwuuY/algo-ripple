import { useState } from 'react';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { insertionSort } from '../algorithms/sorting/insertionSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import SortingVisualiser from '../components/SortingVisualiser';

const algorithms = {
  bubble: bubbleSort,
  insertion: insertionSort,
  merge: mergeSort,
};

useEffect(() => {
  document.title = 'AlgoRipple - Sorting';
}, []);

export default function SortingPage() {
  const [selected, setSelected] = useState('bubble');

 return (
  
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Sorting Algorithms
      </h1>

      <div className="flex justify-center mb-8">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="
            block
            w-48
            px-4
            py-2
            text-lg
            font-medium
            text-gray-700
            bg-white
            border border-gray-300
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
          "
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
      </div>

      <SortingVisualiser algorithm={algorithms[selected]} />
    </div>
  );
}