
import React from 'react';
import { Users, Filter, UserCheck } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';

const TeamFilter = ({ members, selectedMembers, onMemberToggle }) => {
  const handleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      // Deselect all
      members.forEach(member => {
        if (selectedMembers.includes(member.id)) {
          onMemberToggle(member.id);
        }
      });
    } else {
      // Select all
      members.forEach(member => {
        if (!selectedMembers.includes(member.id)) {
          onMemberToggle(member.id);
        }
      });
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm px-8 py-6 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
              <p className="text-sm text-gray-600">Filter tasks by team member</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {selectedMembers.length} of {members.length} selected
              </span>
            </div>
            
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors duration-200 font-medium text-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {selectedMembers.length === members.length ? 'Deselect All' : 'Select All'}
              </span>
            </button>
          </div>
        </div>
        
        <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
          {members.map((member) => (
            <div key={member.id} className="flex-shrink-0">
              <TeamMemberCard
                member={member}
                isSelected={selectedMembers.includes(member.id)}
                onToggle={onMemberToggle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamFilter;