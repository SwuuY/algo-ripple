// src/components/SortingVisualizer.js
import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [highlight, setHighlight] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
    setArray(arr);
    setHighlight([]);
  };

  const animateSort = async () => {
    const generator = bubbleSort(array);
    for (let step of generator) {
      if (step.type === 'compare' || step.type === 'swap') {
        setHighlight(step.indices);
        if (step.array) setArray(step.array);
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    setHighlight([]);
  };

  return (
    <div>
      <h2>Bubble Sort Visualizer</h2>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '300px' }}>
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{
              height: `${val * 3}px`,
              width: '10px',
              backgroundColor: highlight.includes(idx) ? 'red' : 'blue',
              margin: '0 2px',
            }}
          ></div>
        ))}
      </div>
      <button onClick={resetArray}>Reset Array</button>
      <button onClick={animateSort}>Start Sorting</button>
    </div>
  );
};

export default Sortin
