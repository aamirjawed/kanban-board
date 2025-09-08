
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreVertical, TrendingUp, Pause, CheckCircle2 } from 'lucide-react';
import IssueCard from './IssueCard';

const KanbanColumn = ({ column, issues, members }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const getColumnIcon = (columnId) => {
    switch (columnId) {
      case 'todo':
        return <Pause className="w-4 h-4" />;
      case 'progress':
        return <TrendingUp className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          icon: 'text-gray-500',
          header: 'text-gray-700'
        };
      case 'progress':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          dot: 'bg-blue-500',
          icon: 'text-blue-600',
          header: 'text-blue-700'
        };
      case 'completed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          dot: 'bg-green-500',
          icon: 'text-green-600',
          header: 'text-green-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          icon: 'text-gray-500',
          header: 'text-gray-700'
        };
    }
  };

  const colors = getColumnColor(column.id);
  const issueIds = issues.map(issue => issue.id);

  return (
    <div className={`${colors.bg} rounded-2xl p-6 w-80 flex-shrink-0 border ${colors.border} transition-all duration-300 ${
      isOver ? 'ring-2 ring-blue-400 ring-opacity-50 bg-blue-100/50 scale-102' : ''
    }`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white shadow-sm ${colors.icon}`}>
            {getColumnIcon(column.id)}
          </div>
          <div>
            <h3 className={`font-bold ${colors.header}`}>{column.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <span className="text-xs text-gray-500 font-medium">
                {issues.length} {issues.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 group">
            <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          </button>
          <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 group">
            <MoreVertical className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Droppable Area */}
      <div 
        ref={setNodeRef} 
        className={`min-h-[500px] transition-all duration-300 ${
          isOver ? 'bg-white/50 rounded-xl border-2 border-dashed border-blue-400' : ''
        }`}
      >
        <SortableContext items={issueIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} members={members} />
            ))}
          </div>
        </SortableContext>
        
        {/* Empty State */}
        {issues.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-dashed ${colors.border} bg-white/50`}>
              {getColumnIcon(column.id)}
            </div>
            <p className="text-sm font-medium">No items yet</p>
            <p className="text-xs text-gray-400 mt-1">Drag items here or create new ones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;