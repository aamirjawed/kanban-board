import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import IssueCard from "./IssueCard";

// Initial task data with assigneeId for filtering
const initialData = {
  todo: [
    { id: "ISSUE-1", title: "Design login page", assignee: "https://i.pravatar.cc/40?img=1", assigneeId: 1 },
  ],
  inProgress: [
    { id: "ISSUE-2", title: "Build auth API", assignee: "https://i.pravatar.cc/40?img=2", assigneeId: 2 },
  ],
  completed: [],
};

export default function KanbanBoard({ selectedMember }) {
  const [columns, setColumns] = useState(initialData);
  const [activeCard, setActiveCard] = useState(null);

  // Find which column a task belongs to
  const findContainer = (id) => {
    if (id in columns) return id;
    return Object.keys(columns).find((key) =>
      columns[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event) => {
    setActiveCard(event.active.data.current);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = findContainer(active.id);
    const destCol = findContainer(over.id) || over.id;

    if (!sourceCol || !destCol || sourceCol === destCol) return;

    setColumns((prev) => {
      const sourceItems = [...prev[sourceCol]];
      const destItems = [...prev[destCol]];
      const moving = sourceItems.find((i) => i.id === active.id);

      return {
        ...prev,
        [sourceCol]: sourceItems.filter((i) => i.id !== active.id),
        [destCol]: [...destItems, moving],
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = findContainer(active.id);
    const destCol = findContainer(over.id) || over.id;

    if (!sourceCol || !destCol) return;

    // Reorder inside same column
    if (sourceCol === destCol) {
      setColumns((prev) => {
        const items = [...prev[sourceCol]];
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return {
          ...prev,
          [sourceCol]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }

    setActiveCard(null);
  };

  // Filter tasks based on selected member
  const filteredColumns = Object.fromEntries(
    Object.entries(columns).map(([col, tasks]) => [
      col,
      selectedMember
        ? tasks.filter((task) => task.assigneeId === selectedMember)
        : tasks,
    ])
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(filteredColumns).map(([key, items]) => (
          <SortableContext key={key} items={items} strategy={rectSortingStrategy}>
            <KanbanColumn id={key} title={key} issues={items} />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeCard ? <IssueCard issue={activeCard} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
