
import React from 'react';

const TeamMemberCard = ({ member, isSelected, onToggle }) => {
  return (
    <div className="relative group mt-3 ml-2">
      <div
        onClick={() => onToggle(member.id)}
        className={`relative w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 ${
          isSelected 
            ? 'ring-4 ring-blue-500 ring-opacity-50 shadow-lg shadow-blue-200' 
            : 'hover:ring-2 hover:ring-gray-300 hover:shadow-md'
        }`}
      >
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full rounded-full object-cover"
        />
    
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isSelected 
            ? 'bg-blue-500/20' 
            : 'bg-black/0 group-hover:bg-black/10'
        }`}></div>
      </div>
      
      {/* Member name */}
      <div className="text-center mt-2">
        <p className={`text-xs font-medium transition-colors duration-300 ${
          isSelected ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900'
        }`}>
          {member.name.split(' ')[0]}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;