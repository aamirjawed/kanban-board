
import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { 
      id: 'list', 
      name: 'List View', 
      icon: '📋',
      description: 'Table format'
    },
    { 
      id: 'kanban', 
      name: 'Kanban Board', 
      icon: '📊',
      description: 'Visual workflow'
    },
    { 
      id: 'notes', 
      name: 'Notes', 
      icon: '📝',
      description: 'Documentation'
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-8 py-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group relative px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-lg shadow-blue-100/50 border border-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                  {tab.icon}
                </span>
                <div className="text-left">
                  <div className="font-semibold">{tab.name}</div>
                  <div className="text-xs text-gray-500">{tab.description}</div>
                </div>
              </div>
              
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;