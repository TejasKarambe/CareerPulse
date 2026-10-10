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
      <div className="space-y-6">
        {/* Top Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadgeClasses(
                app.status
              )}`}
            >
              {app.status}
            </span>
            <Badge variant="outline">{app.workArrangement}</Badge>
            <Badge variant="outline">{app.employmentType}</Badge>
          </div>

          <div className="flex items-center gap-2">
            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30"
              >
                <span>Job Posting</span>
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
            >
              <Trash2 size={13} />
            </Button>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Salary Range</span>
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1">
              <DollarSign size={14} className="text-emerald-500" />
              {formatSalaryRange(app.salaryMin, app.salaryMax, app.currency)}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Location</span>
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1 truncate">
              <MapPin size={14} className="text-indigo-500" />
              {app.location || 'Remote'}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Applied On</span>
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1">
              <Calendar size={14} className="text-sky-500" />
              {formatDate(app.appliedDate)}
            </div>
          </div>
        </div>

        {/* Tags */}
        {app.tags && app.tags.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase text-slate-400 mb-2">Technologies & Skills</h5>
            <div className="flex flex-wrap gap-1.5">
              {app.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200/70 dark:border-indigo-800/60"
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
            <h5 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText size={14} /> Job Description
            </h5>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200/80 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {app.description}
            </div>
          </div>
        )}

        {/* Interview Timeline */}
        <div>
          <h5 className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
            <Calendar size={14} /> Scheduled Rounds & Interview History ({app.interviewDates?.length || 0})
          </h5>
          {!app.interviewDates || app.interviewDates.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No interview rounds scheduled yet.</p>
          ) : (
            <div className="space-y-2.5">
              {app.interviewDates.map((iv, idx) => (
                <div
                  key={iv.id || idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {iv.round}
                      {iv.interviewer && (
                        <span className="text-xs text-slate-400 font-normal">
                          with {iv.interviewer}
                        </span>
                      )}
                    </div>
                    {iv.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-7">
                        {iv.notes}
                      </p>
                    )}
                  </div>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    {formatDateTime(iv.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interview Questions Logged */}
        <div>
          <h5 className="text-xs font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
            <HelpCircle size={14} /> Questions Encountered ({app.interviewQuestions?.length || 0})
          </h5>
          {!app.interviewQuestions || app.interviewQuestions.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No questions logged for this role.</p>
          ) : (
            <div className="space-y-3">
              {app.interviewQuestions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                >
                  <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">Q:</span>
                    {q.question}
                  </div>
                  {q.answer && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 pl-4">
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
            <h5 className="text-xs font-bold uppercase text-slate-400 mb-1.5">Personal Notes</h5>
            <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300">
              {app.notes}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
