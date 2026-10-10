import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDateTime } from '../../utils/formatters';

export const InterviewCalendar = ({ onSelectApp }) => {
  const { applications, currentPaletteConfig } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Flatten all interview rounds
  const allEvents = useMemo(() => {
    const events = [];
    applications.forEach((app) => {
      (app.interviewDates || []).forEach((iv) => {
        events.push({
          app,
          round: iv.round,
          date: iv.date,
          interviewer: iv.interviewer,
          notes: iv.notes,
        });
      });
    });
    return events;
  }, [applications]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Group events by day of month (1 - 31)
  const eventsByDay = useMemo(() => {
    const map = {};
    allEvents.forEach((ev) => {
      const d = new Date(ev.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(ev);
      }
    });
    return map;
  }, [allEvents, year, month]);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="theme-text-primary" size={20} />
            Interview Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">Upcoming interview rounds and recruiter calls.</p>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 bg-white dark:bg-slate-900 p-1.5 sm:p-0 rounded-xl border sm:border-0 border-slate-200 dark:border-slate-800">
          <Button variant="outline" size="sm" onClick={prevMonth} className="p-1.5">
            <ChevronLeft size={16} />
          </Button>
          <span className="font-bold text-xs sm:text-sm min-w-32 sm:min-w-36 text-center text-slate-800 dark:text-slate-200">
            {monthName}
          </span>
          <Button variant="outline" size="sm" onClick={nextMonth} className="p-1.5">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        {/* Days of week */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 text-center py-2 bg-slate-50 dark:bg-slate-850 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-16 sm:min-h-24 bg-slate-50/40 dark:bg-slate-950/20 p-1 sm:p-2" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayEvents = eventsByDay[dayNum] || [];

            return (
              <div
                key={`day-${dayNum}`}
                className="min-h-16 sm:min-h-24 p-1 sm:p-2 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/30 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full theme-btn-primary" />
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  {dayEvents.map((ev, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectApp(ev.app)}
                      className="p-1 rounded-md sm:rounded-lg theme-bg-light border border-slate-200 dark:border-slate-700 text-[9px] sm:text-[11px] cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                      <div className="font-bold theme-text-primary truncate">
                        {ev.app.companyName}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 truncate text-[9px] hidden sm:block">
                        {ev.round}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* List of upcoming interviews */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3 sm:mb-4">
          All Logged Interview Commitments ({allEvents.length})
        </h3>
        {allEvents.length === 0 ? (
          <p className="text-xs text-slate-400">No interviews logged across applications.</p>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {allEvents.map((ev, idx) => (
              <div
                key={idx}
                onClick={() => onSelectApp(ev.app)}
                className="p-3 sm:p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 hover:border-slate-400 cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-xs sm:text-sm theme-text-primary">
                      {ev.app.companyName}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 truncate">• {ev.app.jobTitle}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {ev.round} {ev.interviewer ? `(${ev.interviewer})` : ''}
                  </div>
                  {ev.notes && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{ev.notes}</p>
                  )}
                </div>
                <div className="text-[11px] sm:text-xs font-mono theme-bg-light theme-text-primary px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                  {formatDateTime(ev.date)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
