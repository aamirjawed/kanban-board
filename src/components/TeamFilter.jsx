import React from "react";

const members = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "Daisy", avatar: "https://i.pravatar.cc/40?img=4" },
];

export default function TeamFilter({ selectedMember, setSelectedMember }) {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {/* View All Card */}
      <div
        onClick={() => setSelectedMember(null)}
        className={`flex flex-col items-center gap-1 cursor-pointer p-3 rounded-xl shadow-sm min-w-[80px] transition ${
          selectedMember === null
            ? "bg-blue-100 border border-blue-500"
            : "bg-white"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
          All
        </div>
        <p className="text-xs text-gray-600">All</p>
      </div>

      {members.map((m) => (
        <div
          key={m.id}
          onClick={() =>
            setSelectedMember(selectedMember === m.id ? null : m.id)
          }
          className={`flex flex-col items-center gap-1 cursor-pointer p-3 rounded-xl shadow-sm min-w-[80px] transition ${
            selectedMember === m.id
              ? "bg-blue-100 border border-blue-500"
              : "bg-white"
          }`}
        >
          <img
            src={m.avatar}
            alt={m.name}
            className="w-10 h-10 rounded-full border"
          />
          <p className="text-xs text-gray-600">{m.name}</p>
        </div>
      ))}
    </div>
  );
}
