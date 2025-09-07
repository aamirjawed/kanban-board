import IssueCard from "./IssueCard";

export default function Column({ title, issues }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-inner min-h-[300px]">
      <h2 className="font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-3">
        {issues.length > 0 ? (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        ) : (
          <p className="text-sm text-gray-400">No issues</p>
        )}
      </div>
    </div>
  );
}
