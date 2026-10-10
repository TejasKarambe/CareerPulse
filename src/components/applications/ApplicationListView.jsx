import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { getStatusBadgeClasses, formatDate, formatSalaryRange } from '../../utils/formatters';
import { Edit2, Trash2, ExternalLink, Calendar, HelpCircle } from 'lucide-react';

export const ApplicationListView = ({ applications, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Mobile Card-List Representation (< sm) */}
      <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {applications.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No applications match your criteria.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              onClick={() => onViewDetails(app)}
              className="p-4 space-y-2.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider theme-text-primary">
                    {app.companyName}
                  </span>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {app.jobTitle}
                  </h4>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize border shrink-0 ${getStatusBadgeClasses(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <Badge variant="outline">{app.workArrangement || 'Remote'}</Badge>
                {(app.salaryMin || app.salaryMax) && (
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                    {formatSalaryRange(app.salaryMin, app.salaryMax, app.currency)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-400">
                <span>Applied {formatDate(app.appliedDate)}</span>
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {app.url && (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title="Open job link"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={() => onEdit(app)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete application for ${app.jobTitle}?`)) {
                        onDelete(app.id);
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table (> sm) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Company & Role</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Arrangement</th>
              <th className="py-3.5 px-4">Salary Range</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-4">Interviews / Q&A</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No applications found matching your criteria.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => onViewDetails(app)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:underline">
                      {app.jobTitle}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{app.companyName}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${getStatusBadgeClasses(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant="outline">{app.workArrangement || 'Remote'}</Badge>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                    {formatSalaryRange(app.salaryMin, app.salaryMax, app.currency)}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 text-xs">
                    {formatDate(app.appliedDate)}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                        <Calendar size={13} /> {app.interviewDates?.length || 0}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <HelpCircle size={13} /> {app.interviewQuestions?.length || 0}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {app.url && (
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Open job link"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button
                        onClick={() => onEdit(app)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete application for ${app.jobTitle}?`)) {
                            onDelete(app.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
