import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function IssueCard({ issue, dragOverlay }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: issue.id, data: issue });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: dragOverlay ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition flex justify-between items-center"
    >
      <div>
        <p className="text-sm font-medium text-gray-800">{issue.title}</p>
        <p className="text-xs text-gray-500">{issue.id}</p>
      </div>
      <img
        src={issue.assignee}
        alt="assignee"
        className="w-8 h-8 rounded-full border"
      />
    </div>
  );
}
