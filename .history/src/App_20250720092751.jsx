import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SortingPage from './pages/SortingPage.jsx';
import GraphPage from './pages/GraphPage';
import HomePage from './pages/HomePage.jsx';
import React from 'react';

function App() {
  return (
    <Router basename="/algo-ripple/">
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold text-blue-600">
            AlgoRipple
        </Link>
        <div className="flex gap-6">
          <Link
            to="/sorting"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Sorting
          </Link>
          <Link
            to="/graph"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Graph
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </Router>
  );

}

export default App;
