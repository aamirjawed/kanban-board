
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Calendar, MessageSquare, Paperclip, Clock, AlertCircle } from 'lucide-react';

const IssueCard = ({ issue, members, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignee = members.find(m => m.id === issue.assigneeId);
  const actualIsDragging = isDragging || sortableIsDragging;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3 text-red-600" />;
      case 'medium': return <Clock className="w-3 h-3 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing ${
        actualIsDragging ? 'shadow-2xl border-blue-300 bg-blue-50/50 rotate-2 scale-105 z-50' : 'hover:border-gray-300'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 flex-1 pr-2">
          {issue.title}
        </h4>
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 flex-shrink-0">
          <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      
      {/* Issue ID and Priority */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-mono text-xs font-medium">
            #{issue.id}
          </span>
          {issue.priority && (
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(issue.priority)}`} />
              {getPriorityIcon(issue.priority)}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3 text-gray-400">
          {issue.hasAttachments && (
            <div className="flex items-center space-x-1 hover:text-gray-600 transition-colors">
              <Paperclip className="w-3 h-3" />
              <span className="text-xs">2</span>
            </div>
          )}
          {issue.comments && (
            <div className="flex items-center space-x-1 hover:text-gray-600 transition-colors">
              <MessageSquare className="w-3 h-3" />
              <span className="text-xs">{issue.comments}</span>
            </div>
          )}
          {issue.dueDate && (
            <div className="flex items-center space-x-1 hover:text-gray-600 transition-colors">
              <Calendar className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {issue.dueDate && (
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium">
              Due {issue.dueDate}
            </span>
          )}
        </div>
        
        {assignee && (
          <div className="flex items-center space-x-2">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm hover:ring-blue-200 transition-all duration-200 hover:scale-110"
              title={assignee.name}
            />
          </div>
        )}
      </div>

      {/* Drag indicator */}
      {actualIsDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50/20"></div>
      )}
    </div>
  );
};

export default IssueCard;