import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpenCheck, HelpCircle, Search, Plus } from 'lucide-react';
import { Input } from '../ui/Input';

export const InterviewNotesView = ({ onSelectApp }) => {
  const { applications } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  // Collect all interview questions across all applications
  const allQuestions = useMemo(() => {
    const list = [];
    applications.forEach((app) => {
      (app.interviewQuestions || []).forEach((q) => {
        list.push({
          ...q,
          app,
        });
      });
    });
    return list;
  }, [applications]);

  const filteredQuestions = useMemo(() => {
    if (!filterQuery.trim()) return allQuestions;
    const q = filterQuery.toLowerCase();
    return allQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        (item.answer && item.answer.toLowerCase().includes(q)) ||
        item.app.companyName.toLowerCase().includes(q)
    );
  }, [allQuestions, filterQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpenCheck className="theme-text-primary" />
            Interview Question Bank & Cheat Sheet
          </h2>
          <p className="text-sm text-slate-500">
            Real interview questions encountered across your interviews with personal talking points.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search questions or answers..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400">
          <HelpCircle size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No interview questions logged yet</p>
          <p className="text-xs mt-1">Open any job application and navigate to the Questions tab to record interview questions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onSelectApp(item.app)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold theme-text-primary">
                    {item.app.companyName} • {item.app.jobTitle}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-start gap-2">
                  <span className="theme-text-primary font-bold shrink-0">Q:</span>
                  {item.question}
                </h4>

                {item.answer && (
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-600 block mb-1">Your Key Points / Response:</span>
                    <p className="whitespace-pre-line leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
