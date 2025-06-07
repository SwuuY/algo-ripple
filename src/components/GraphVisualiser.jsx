import React, { useState, useEffect, useRef } from 'react';
import { bfs } from '../algorithms/graph/bfs';
import { dfs } from '../algorithms/graph/dfs';

const ALGORITHMS = {
  bfs,
  dfs,
};

const WIDTH = 20;
const HEIGHT = 10;


export default function GraphVisualiser({ algorithm }) {
  const [grid, setGrid] = useState([]);
  const [visited, setVisited] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [mode, setMode] = useState('wall'); // 'wall' | 'start' | 'end'
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [endNode, setEndNode] = useState({ row: HEIGHT - 1, col: WIDTH - 1 });
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);  
  const cancelRequested = useRef(false);

  useEffect(() => {
    const newGrid = Array.from({ length: HEIGHT }, (_, row) =>
      Array.from({ length: WIDTH }, (_, col) => ({
        row,
        col,
        isVisited: false,
        isWall: false,
      }))
    );
    setGrid(newGrid);
    setVisited([]);
  }, []);

  const togglePause = () => {
    setIsPaused(prev => {
      isPausedRef.current = !prev;
      return !prev;
    });
  };

  const handleReset = () => {
    const newGrid = Array.from({ length: HEIGHT }, (_, row) =>
    Array.from({ length: WIDTH }, (_, col) => ({
      row,
      col,
      isWall: false,
    }))
    );
    setGrid(newGrid);
    setVisited([]);
    setStartNode({ row: 0, col: 0 });
    setEndNode({ row: HEIGHT - 1, col: WIDTH - 1 });
    setMode('wall');
  }

  const resetVisitedNodes = () => {
    setGrid(prevGrid =>
      prevGrid.map(row =>
        row.map(cell => ({
          ...cell,
          isVisited: false,
        }))
      )
    );
    setVisited([]);
  };

  const handleCellInteraction = (row, col) => {
    if (isRunning) return;
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(cell => ({ ...cell })));

      if (mode === 'wall') {
        if (
          (startNode.row === row && startNode.col === col) ||
          (endNode.row === row && endNode.col === col)
        )
          return prev; // Don't overwrite start/end
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
      } else if (mode === 'start') {
        setStartNode({ row, col });
        setMode('wall');
      } else if (mode === 'end') {
        setEndNode({ row, col });
        setMode('wall');
      }

      return newGrid;
    });
  };

  const handleMouseOver = (row, col) => {
    if (mouseDown && mode === 'wall') {
      setGrid(prev => {
        const newGrid = prev.map(r => r.map(cell => ({ ...cell })));
        if (
          (startNode.row === row && startNode.col === col) ||
          (endNode.row === row && endNode.col === col)
        )
          return prev;
        newGrid[row][col].isWall = true;
        return newGrid;
      });
    }
  };

  const handleVisualize = async () => {
    if (isRunning) return;

    setIsRunning(true);
    cancelRequested.current = false;


    const result = ALGORITHMS[algorithm](grid, startNode, endNode);

    for (const cell of result) {
      if (cancelRequested.current) break;

      // Pause support
      while (isPausedRef.current) {
        await new Promise((r) => setTimeout(r, 100));
        if (cancelRequested.current) break;
      }

      setVisited((prev) => [...prev, `${cell.row}-${cell.col}`]);

      if (cell.row === endNode.row && cell.col === endNode.col) break;

      await new Promise((r) => setTimeout(r, 50));
    }

    setIsRunning(false);
    setIsPaused(false);
  };
  return (
    <div
      className="flex flex-col items-center gap-4 select-none"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setMode('start')}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${mode === 'start' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Set Start
        </button>
        <button
          onClick={() => setMode('end')}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${mode === 'end' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Set End
        </button>
        <button
          onClick={handleVisualize}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          Visualize {algorithm.toUpperCase()}
        </button>
        <button
          onClick={handleReset}
          disabled={isRunning}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
        >
          Reset Grid
        </button>
        <button
          onClick={resetVisitedNodes}
          disabled={isRunning}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
        >
          Reset Path
        </button>
      </div>

      <div
        className="grid border border-gray-300 rounded-md p-1"
        style={{ gridTemplateColumns: `repeat(${WIDTH}, 20px)` }}
      >
        {grid.flat().map((cell, idx) => {
          const isStart = startNode.row === cell.row && startNode.col === cell.col;
          const isEnd = endNode.row === cell.row && endNode.col === cell.col;
          const key = `${cell.row}-${cell.col}`;
          const isVisited = visited.includes(key);

          let bg = 'bg-white';
          if (cell.isWall) bg = 'bg-black';
          else if (isStart) bg = 'bg-green-500';
          else if (isEnd) bg = 'bg-red-500';
          else if (isVisited) bg = 'bg-blue-400';

          return (
            <div
              key={idx}
              onClick={() => handleCellInteraction(cell.row, cell.col)}
              onMouseOver={() => handleMouseOver(cell.row, cell.col)}
              className={`w-5 h-5 border cursor-pointer transition-colors duration-200 ${bg}`}
            />
          );
        })}
      </div>
              {isRunning && (
          <div className="flex gap-2">
            <button
              onClick={togglePause}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => {
                cancelRequested.current = true;
                isPausedRef.current = false;
                setIsPaused(false);
                setIsRunning(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              Stop
            </button>
          </div>
        )}
    </div>
  );
}
