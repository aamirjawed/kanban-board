
import React, { useState } from 'react';
import { DndContext, closestCenter, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import TeamFilter from './components/TeamFilter';
import KanbanBoard from './components/KanbanBoard';
import IssueCard from './components/IssueCard';

const App = () => {
  const [activeTab, setActiveTab] = useState('kanban');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draggedIssue, setDraggedIssue] = useState(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Mock data
  const members = [
    { id: 1, name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: 2, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b050?w=150&h=150&fit=crop&crop=face' },
    { id: 3, name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: 4, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: 5, name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
  ];

  const [issues, setIssues] = useState([
    {
      id: 'TASK-001',
      title: 'Design new user dashboard interface with modern components',
      status: 'todo',
      assigneeId: 1,
      priority: 'high',
      dueDate: 'Sep 15',
      hasAttachments: true,
      comments: 3
    },
    {
      id: 'TASK-002', 
      title: 'Implement authentication system and security measures',
      status: 'progress',
      assigneeId: 2,
      priority: 'medium',
      dueDate: 'Sep 20',
      comments: 5
    }
  ]);

  const handleMemberToggle = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleCompleteCycle = () => {
    alert('Cycle completed successfully! 🎉');
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    const issue = issues.find(issue => issue.id === active.id);
    setDraggedIssue(issue);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeIssue = issues.find(issue => issue.id === activeId);
    if (!activeIssue) return;

    // Check if we're hovering over a column
    if (overId === 'todo' || overId === 'progress' || overId === 'completed') {
      if (activeIssue.status !== overId) {
        setIssues(prev => prev.map(issue => 
          issue.id === activeId ? { ...issue, status: overId } : issue
        ));
      }
    }
  };

  const handleDragEnd = () => {
    setActiveId(null);
    setDraggedIssue(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Header onCompleteCycle={handleCompleteCycle} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <TeamFilter 
          members={members}
          selectedMembers={selectedMembers}
          onMemberToggle={handleMemberToggle}
        />
        
        {activeTab === 'kanban' && (
          <KanbanBoard 
            issues={issues}
            members={members}
            selectedMembers={selectedMembers}
          />
        )}
        
        {activeTab === 'list' && (
          <div className="p-8 flex items-center justify-center h-96">
            <div className="text-center text-gray-500 bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-700">List View</h3>
              <p className="text-gray-500">List view component would be implemented here</p>
            </div>
          </div>
        )}
        
        {activeTab === 'notes' && (
          <div className="p-8 flex items-center justify-center h-96">
            <div className="text-center text-gray-500 bg-white rounded-2xl p-12 shadow-lg">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-700">Notes</h3>
              <p className="text-gray-500">Notes component would be implemented here</p>
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId && draggedIssue ? (
            <div className="rotate-3 scale-105">
              <IssueCard issue={draggedIssue} members={members} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default App;