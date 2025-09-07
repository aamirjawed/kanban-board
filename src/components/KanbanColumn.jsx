import { useDroppable } from "@dnd-kit/core";
import IssueCard from "./IssueCard";

export default function KanbanColumn({ id, title, issues }) {
  const { setNodeRef } = useDroppable({ id });

  const displayTitle =
    title === "todo"
      ? "To Do"
      : title === "inProgress"
      ? "In Progress"
      : "Completed";

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 p-4 rounded-xl shadow-inner min-h-[300px]"
    >
      <h2 className="font-semibold text-gray-700 mb-4">{displayTitle}</h2>
      <div className="space-y-3 min-h-[200px]">
        {issues.length > 0 ? (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        ) : (
          <p className="text-sm text-gray-400">No issues</p>
        )}
      </div>
    </div>
  );
}
