import React, { useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { KanbanColumn } from './KanbanColumn';
import { STAGES } from '../../utils/constants';

export const KanbanBoard = ({
  applications,
  onStatusChange,
  onAddInStage,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Dropped into another column
    if (source.droppableId !== destination.droppableId) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  const columnsData = useMemo(() => {
    return STAGES.map((stage) => ({
      stage,
      apps: applications.filter((app) => app.status === stage.id),
    }));
  }, [applications]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 items-start h-[calc(100vh-11rem)]">
        {columnsData.map(({ stage, apps }) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            apps={apps}
            onAddInStage={onAddInStage}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
