
import React from 'react';
import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ issues, members, selectedMembers }) => {
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' }
  ];

  // Filter issues based on selected members
  const filteredIssues = selectedMembers.length > 0 
    ? issues.filter(issue => selectedMembers.includes(issue.assigneeId))
    : issues;

  const getColumnIssues = (columnId) => 
    filteredIssues.filter(issue => issue.status === columnId);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Board Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const columnIssues = getColumnIssues(column.id);
            const getStatColor = (columnId) => {
              switch (columnId) {
                case 'todo': return 'from-gray-400 to-gray-600';
                case 'progress': return 'from-blue-500 to-blue-700';
                case 'completed': return 'from-green-500 to-green-700';
                default: return 'from-gray-400 to-gray-600';
              }
            };

            return (
              <div key={column.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{column.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{columnIssues.length}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatColor(column.id)} flex items-center justify-center`}>
                    <span className="text-white text-xl font-bold">{columnIssues.length}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getStatColor(column.id)} transition-all duration-500`}
                      style={{ 
                        width: `${filteredIssues.length > 0 ? (columnIssues.length / filteredIssues.length) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Info */}
        {selectedMembers.length > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🔍</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Filtered by {selectedMembers.length} team member{selectedMembers.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-blue-700">
                    Showing {filteredIssues.length} of {issues.length} total tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Kanban Columns */}
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              issues={getColumnIssues(column.id)}
              members={members}
            />
          ))}
        </div>

        {/* No Issues Message */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300 mt-8">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              {selectedMembers.length > 0 ? 'No tasks for selected members' : 'No tasks available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedMembers.length > 0 
                ? 'Try selecting different team members or create new tasks.' 
                : 'Get started by creating your first task.'}
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Create New Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;