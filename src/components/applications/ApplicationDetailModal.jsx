import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  getStatusBadgeClasses,
  formatDate,
  formatDateTime,
  formatSalaryRange
} from '../../utils/formatters';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';

export const ApplicationDetailModal = ({ app, isOpen, onClose, onEdit, onDelete }) => {
  if (!app) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={app.jobTitle}
      subtitle={app.companyName}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Top Badges & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold uppercase border ${getStatusBadgeClasses(
                app.status
              )}`}
            >
              {app.status}
            </span>
            <Badge variant="outline">{app.workArrangement}</Badge>
            <Badge variant="outline">{app.employmentType}</Badge>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs theme-text-primary font-medium hover:underline px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 theme-bg-light"
              >
                <span>Job Link</span>
                <ExternalLink size={12} />
              </a>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                onClose();
                onEdit(app);
              }}
              className="text-xs px-2.5"
            >
              <Edit2 size={13} />
              <span>Edit</span>
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                if (confirm(`Delete application for ${app.jobTitle}?`)) {
                  onDelete(app.id);
                  onClose();
                }
              }}
              className="text-xs px-2.5"
            >
              <Trash2 size={13} />
            </Button>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Salary Range</span>
            <div className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1">
              <DollarSign size={14} className="text-emerald-500 shrink-0" />
              <span className="truncate">{formatSalaryRange(app.salaryMin, app.salaryMax, app.currency)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Location</span>
            <div className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1 truncate">
              <MapPin size={14} className="theme-text-primary shrink-0" />
              <span className="truncate">{app.location || 'Remote'}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 xs:col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase">Applied On</span>
            <div className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1">
              <Calendar size={14} className="text-sky-500 shrink-0" />
              <span>{formatDate(app.appliedDate)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {app.tags && app.tags.length > 0 && (
          <div>
            <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-1.5">Technologies & Skills</h5>
            <div className="flex flex-wrap gap-1.5">
              {app.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg theme-bg-light theme-text-primary text-xs font-medium border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        {app.description && (
          <div>
            <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-1.5 flex items-center gap-1">
              <FileText size={13} /> Job Description
            </h5>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line max-h-48 overflow-y-auto">
              {app.description}
            </div>
          </div>
        )}

        {/* Interview Timeline */}
        <div>
          <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-2.5 flex items-center gap-1">
            <Calendar size={13} /> Scheduled Rounds & Interview History ({app.interviewDates?.length || 0})
          </h5>
          {!app.interviewDates || app.interviewDates.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No interview rounds scheduled yet.</p>
          ) : (
            <div className="space-y-2">
              {app.interviewDates.map((iv, idx) => (
                <div
                  key={iv.id || idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full theme-btn-primary text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{iv.round}</span>
                      {iv.interviewer && (
                        <span className="text-[11px] text-slate-400 font-normal">
                          with {iv.interviewer}
                        </span>
                      )}
                    </div>
                    {iv.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-6">
                        {iv.notes}
                      </p>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono theme-text-primary theme-bg-light px-2 py-0.5 rounded-md self-start sm:self-auto">
                    {formatDateTime(iv.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interview Questions Logged */}
        <div>
          <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-2.5 flex items-center gap-1">
            <HelpCircle size={13} /> Questions Encountered ({app.interviewQuestions?.length || 0})
          </h5>
          {!app.interviewQuestions || app.interviewQuestions.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No questions logged for this role.</p>
          ) : (
            <div className="space-y-2.5">
              {app.interviewQuestions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                >
                  <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 flex items-start gap-1.5">
                    <span className="theme-text-primary font-bold shrink-0">Q:</span>
                    <span>{q.question}</span>
                  </div>
                  {q.answer && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 pl-3">
                      <span className="text-emerald-600 font-bold shrink-0">A:</span>
                      <p className="whitespace-pre-line">{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personal Notes */}
        {app.notes && (
          <div>
            <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-1">Personal Notes</h5>
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300">
              {app.notes}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
