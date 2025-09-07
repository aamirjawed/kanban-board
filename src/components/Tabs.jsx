export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["List View", "Kanban Board", "Notes"];

  return (
    <div className="flex gap-4 bg-white p-3 rounded-xl shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
