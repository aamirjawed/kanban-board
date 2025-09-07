export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-4 bg-white border-b border-gray-200 rounded-xl shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Project Dashboard</h1>
        <p className="text-gray-500 text-sm">Track tasks and progress easily</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
        Complete Cycle
      </button>
    </header>
  );
}
