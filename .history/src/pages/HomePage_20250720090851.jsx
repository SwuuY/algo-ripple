// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, ChartNetworkIcon } from 'lucide-react';

useEffect(() => {
  document.title = 'AlgoRipple - Sorting';
}, []);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-5xl font-bold text-blue-700 mb-6">AlgoRipple</h1>
        <p className="text-lg text-gray-700 mb-10">
          Explore sorting and graph algorithms with smooth visualizations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/sorting"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            <BarChart3 size={20} />
            Sorting Visualizer
          </Link>

          <Link
            to="/graph"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition"
          >
            <ChartNetworkIcon size={20} />
            Graph Visualizer
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
