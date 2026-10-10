import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Kanban,
  CalendarDays,
  BarChart3,
  Building2,
  BookOpenCheck,
  Settings
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const MobileBottomNav = () => {
  const { activeTab, setActiveTab, applications } = useApp();

  const primaryTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'applications', label: 'Board', icon: Kanban, badge: applications.length },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {primaryTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer min-w-14',
              isActive
                ? 'theme-text-primary font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            )}
          >
            <div className="relative">
              <Icon size={19} className="transition-transform" />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full theme-btn-primary text-white text-[9px] font-extrabold flex items-center justify-center">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
