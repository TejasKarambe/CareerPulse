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
  HelpCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Sidebar = () => {
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

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-col shrink-0 h-screen sticky top-0 transition-all select-none">
      {/* Brand header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="w-9 h-9 rounded-xl theme-btn-primary flex items-center justify-center text-white shadow-md">
          <Briefcase size={20} className="stroke-[2.2]" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            CareerPulse
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded theme-bg-light theme-text-primary">
              PRO
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Job Application Tracker</p>
        </div>
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
              onClick={() => setActiveTab(item.id)}
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
                    'transition-transform group-hover:scale-110',
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
          onClick={openTutorial}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
        >
          <HelpCircle size={15} />
          <span>Interactive Feature Guide</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between">
        <span>Offline-first (IDB)</span>
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>
    </aside>
  );
};
