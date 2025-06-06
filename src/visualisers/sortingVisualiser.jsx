import React, { useState, useEffect, useRef } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';

const SortingVisualiser = () => {
  const [array, setArray] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [sortingState, setSortingState] = useState('idle'); // 'idle', 'running', 'paused'
  const cancelRequested = useRef(false);
  const pauseRequested = useRef(false);  // NEW ref for pause

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (sortingState === 'running' || sortingState === 'paused') return;
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(arr);
    setHighlight([]);
    setSortingState('idle');
    cancelRequested.current = false;
    pauseRequested.current = false;
  };

  const animateSort = async () => {
    if (sortingState === 'running') return;

    setSortingState('running');
    cancelRequested.current = false;
    pauseRequested.current = false;

    const generator = bubbleSort(array);

    for (let step of generator) {
      if (cancelRequested.current) break;

      // Wait if paused
      while (pauseRequested.current) {
        await new Promise((r) => setTimeout(r, 100));
        if (cancelRequested.current) break;
      }
      if (cancelRequested.current) break;

      if (step.type === 'compare' || step.type === 'swap') {
        setHighlight(step.indices);
        if (step.array) setArray(step.array);
      }
      await new Promise((r) => setTimeout(r, 100));
    }

    setHighlight([]);
    setSortingState('idle');
    cancelRequested.current = false;
    pauseRequested.current = false;
  };

  const handlePauseResume = () => {
    if (sortingState === 'running') {
      pauseRequested.current = true;
      setSortingState('paused');
    } else if (sortingState === 'paused') {
      pauseRequested.current = false;
      setSortingState('running');
    }
  };

  const handleCancel = () => {
    cancelRequested.current = true;
    pauseRequested.current = false;
    setSortingState('idle');
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-5 font-sans">
      <h2 className="text-4xl text-center mb-8 font-bold text-blue-700">
        Bubble Sort Visualizer
      </h2>
      <div className="flex items-end h-80 bg-gray-100 rounded-xl p-4 shadow-md mb-8">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`mx-1 flex-1 rounded-sm transition-all duration-300 ease-in-out`}
            style={{
              height: `${val * 2.8}px`,
              width: '12px',
              backgroundColor: highlight.includes(idx) ? '#ef4444' : '#3b82f6',
            }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={resetArray}
          disabled={sortingState !== 'idle'}
          className={`py-3 px-7 rounded-lg font-semibold transition-colors duration-300
            ${sortingState !== 'idle' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800 text-white'}`}
        >
          Reset Array
        </button>

        <button
          onClick={animateSort}
          disabled={sortingState !== 'idle'}
          className={`py-3 px-7 rounded-lg font-semibold transition-colors duration-300
            ${sortingState === 'idle' ? 'bg-green-600 hover:bg-green-800 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Start Sorting
        </button>

        {(sortingState === 'running' || sortingState === 'paused') && (
          <>
            <button
              onClick={handlePauseResume}
              className="py-3 px-7 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-300"
            >
              {sortingState === 'running' ? 'Pause' : 'Resume'}
            </button>

            <button
              onClick={handleCancel}
              className="py-3 px-7 rounded-lg font-semibold bg-red-600 hover:bg-red-800 text-white transition-colors duration-300"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SortingVisualiser;
