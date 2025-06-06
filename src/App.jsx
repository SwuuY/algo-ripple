import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SortingPage from './pages/SortingPage.jsx';
import GraphPage from './pages/GraphPage';
import React from 'react';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/sorting">Sorting</Link>
        <Link to="/graph">Graph</Link>
      </nav>
      <Routes>
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </Router>
  );
}

export default App;
