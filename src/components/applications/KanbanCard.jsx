import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Badge } from '../ui/Badge';
import {
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  HelpCircle,
  Trash2,
  Edit2
} from 'lucide-react';
import { formatSalaryRange, formatDate } from '../../utils/formatters';

export const KanbanCard = ({ app, index, onEdit, onDelete, onViewDetails }) => {
  return (
    <Draggable draggableId={app.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group bg-white dark:bg-slate-900 rounded-xl border p-4 shadow-xs transition-all hover:shadow-md cursor-grab active:cursor-grabbing select-none relative ${
            snapshot.isDragging
              ? 'ring-2 theme-ring-primary shadow-2xl scale-[1.02] rotate-1 z-50 border-transparent bg-slate-50 dark:bg-slate-800'
              : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          {/* Header: Company & Quick Actions */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider theme-text-primary">
                {app.companyName}
              </span>
              <h4
                onClick={() => onViewDetails(app)}
                className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 hover:underline transition-colors cursor-pointer"
              >
                {app.jobTitle}
              </h4>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(app);
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Edit"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete application for ${app.jobTitle} at ${app.companyName}?`)) {
                    onDelete(app.id);
                  }
                }}
                className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Details & Metadata */}
          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 my-2.5">
            {app.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="shrink-0 text-slate-400" />
                <span className="truncate">{app.location}</span>
              </div>
            )}
            {(app.salaryMin || app.salaryMax) && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <DollarSign size={13} className="shrink-0 text-emerald-500" />
                <span>{formatSalaryRange(app.salaryMin, app.salaryMax, app.currency)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="shrink-0 text-slate-400" />
              <span>Applied {formatDate(app.appliedDate)}</span>
            </div>
          </div>

          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {app.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
              {app.tags.length > 3 && (
                <span className="text-[10px] px-1 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium">
                  +{app.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer Indicators */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
            <div className="flex items-center gap-2.5">
              {app.interviewDates?.length > 0 && (
                <span
                  className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-medium"
                  title={`${app.interviewDates.length} interview rounds scheduled`}
                >
                  <Calendar size={12} />
                  {app.interviewDates.length}
                </span>
              )}
              {app.interviewQuestions?.length > 0 && (
                <span
                  className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium"
                  title={`${app.interviewQuestions.length} interview questions logged`}
                >
                  <HelpCircle size={12} />
                  {app.interviewQuestions.length}
                </span>
              )}
            </div>

            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-0.5"
                title="Open job listing link"
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
