import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { KanbanCard } from './KanbanCard';
import { Plus } from 'lucide-react';

export const KanbanColumn = ({ stage, apps, onAddInStage, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="flex flex-col w-[82vw] xs:w-72 sm:w-80 shrink-0 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800/60 max-h-[calc(100vh-14rem)] lg:max-h-[calc(100vh-12rem)]">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${stage.border.replace('border', 'bg')}`} />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 tracking-tight">
            {stage.label}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {apps.length}
          </span>
        </div>

        <button
          onClick={() => onAddInStage(stage.id)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={`Add application to ${stage.label}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto space-y-3 p-1 rounded-xl transition-colors min-h-[140px] ${
              snapshot.isDraggingOver
                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 ring-2 theme-ring-primary ring-dashed'
                : ''
            }`}
          >
            {apps.map((app, index) => (
              <KanbanCard
                key={app.id}
                app={app}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onViewDetails={onViewDetails}
              />
            ))}
            {provided.placeholder}

            {apps.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-28 sm:h-32 flex items-center justify-center text-xs text-slate-400 dark:text-slate-600 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                Drop items here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
