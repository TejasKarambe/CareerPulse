import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Kanban,
  CalendarDays,
  BarChart3,
  Building2,
  BookOpenCheck,
  Settings,
  Briefcase,
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, applications, openTutorial } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'applications', label: 'Applications', icon: Kanban, badge: applications.length },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'notes', label: 'Interview Notes', icon: BookOpenCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 lg:z-auto w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 h-screen transition-transform duration-300 ease-in-out select-none',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl theme-btn-primary flex items-center justify-center text-white shadow-md shrink-0">
              <Briefcase size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                CareerPulse
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded theme-bg-light theme-text-primary">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Job Tracker</p>
            </div>
          </div>

          {/* Close button for mobile screen */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation menu */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer',
                  isActive
                    ? 'theme-btn-primary text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={cn(
                      'transition-transform group-hover:scale-110 shrink-0',
                      isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-bold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tutorial Guide button in sidebar */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => {
              openTutorial();
              if (onClose) onClose();
            }}
            className="w-full flex items-center justify-center sm:justify-start gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            <HelpCircle size={15} className="shrink-0" />
            <span>Feature Guide</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span>Offline-first (IDB)</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </aside>
    </>
  );
};
