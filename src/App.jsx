import { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import TeamFilter from "./components/TeamFilter";
import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  const [activeTab, setActiveTab] = useState("Kanban Board");
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <TeamFilter selectedMember={selectedMember} setSelectedMember={setSelectedMember} />

        {activeTab === "Kanban Board" && (
          <KanbanBoard selectedMember={selectedMember} />
        )}
        {activeTab === "List View" && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">List View placeholder</p>
          </div>
        )}
        {activeTab === "Notes" && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Notes placeholder</p>
          </div>
        )}
      </div>
    </div>
  );
}
