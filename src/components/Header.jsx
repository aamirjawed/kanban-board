
import React from 'react';

const Header = ({ onCompleteCycle }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Project Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage your team's workflow efficiently</p>
          </div>
        </div>
        <button
          onClick={onCompleteCycle}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>Complete Cycle</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;