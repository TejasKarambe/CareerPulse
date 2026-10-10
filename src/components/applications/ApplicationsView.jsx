import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanBoard } from './KanbanBoard';
import { ApplicationListView } from './ApplicationListView';
import { Button } from '../ui/Button';
import { Select } from '../ui/Input';
import { STAGES, WORK_ARRANGEMENTS } from '../../utils/constants';
import { Kanban, List, SlidersHorizontal, Plus } from 'lucide-react';

export const ApplicationsView = ({
  onOpenNewModal,
  onEditApp,
  onDeleteApp,
  onViewDetails,
  onAddInStage
}) => {
  const {
    applications,
    viewMode,
    setViewMode,
    searchQuery,
    selectedStage,
    setSelectedStage,
    selectedArrangement,
    setSelectedArrangement,
    sortBy,
    setSortBy,
    updateApplicationStatus
  } = useApp();

  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

  // Filtered & Sorted applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = app.jobTitle.toLowerCase().includes(q);
          const matchesCompany = app.companyName.toLowerCase().includes(q);
          const matchesTags = (app.tags || []).some((t) => t.toLowerCase().includes(q));
          const matchesLocation = (app.location || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesCompany && !matchesTags && !matchesLocation) {
            return false;
          }
        }

        // Stage filter
        if (selectedStage !== 'all' && app.status !== selectedStage) {
          return false;
        }

        // Arrangement filter
        if (selectedArrangement !== 'all' && app.workArrangement !== selectedArrangement) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'appliedDate-desc') {
          return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
        }
        if (sortBy === 'appliedDate-asc') {
          return new Date(a.appliedDate || 0) - new Date(b.appliedDate || 0);
        }
        if (sortBy === 'company-asc') {
          return a.companyName.localeCompare(b.companyName);
        }
        if (sortBy === 'salary-desc') {
          return (b.salaryMax || 0) - (a.salaryMax || 0);
        }
        return 0;
      });
  }, [applications, searchQuery, selectedStage, selectedArrangement, sortBy]);

  const hasActiveFilters = selectedStage !== 'all' || selectedArrangement !== 'all' || searchQuery;

  return (
    <div className="space-y-4">
      {/* Top Filter & View Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        {/* Mobile Filter Toggle Header */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <SlidersHorizontal size={14} className="theme-text-primary" />
            <span>Filters & Sort</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full theme-btn-primary" />
            )}
          </button>

          {/* View Mode Toggle Mobile */}
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'theme-btn-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Kanban size={13} />
                <span>Board</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'theme-btn-primary shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List size={13} />
                <span>List</span>
              </button>
            </div>

            <Button size="sm" variant="primary" onClick={onOpenNewModal} className="text-xs px-2.5">
              <Plus size={14} />
              <span>Add</span>
            </Button>
          </div>
        </div>

        {/* Filters Controls Grid (Always visible on desktop, toggleable on mobile) */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 ${
          mobileFiltersExpanded ? 'block' : 'hidden lg:flex'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:w-auto">
            <div className="w-full sm:w-36">
              <Select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                <option value="all">All Stages</option>
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full sm:w-36">
              <Select
                value={selectedArrangement}
                onChange={(e) => setSelectedArrangement(e.target.value)}
              >
                <option value="all">All Locations</option>
                {WORK_ARRANGEMENTS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full sm:w-40">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="appliedDate-desc">Newest Applied</option>
                <option value="appliedDate-asc">Oldest Applied</option>
                <option value="company-asc">Company (A-Z)</option>
                <option value="salary-desc">Highest Salary</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedArrangement('all');
                }}
                className="text-xs theme-text-primary font-semibold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}

            {/* Desktop View Mode Toggle */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'kanban'
                      ? 'theme-btn-primary shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Kanban size={15} />
                  <span>Board</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'theme-btn-primary shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <List size={15} />
                  <span>List</span>
                </button>
              </div>

              <Button size="sm" variant="primary" onClick={onOpenNewModal}>
                <Plus size={15} />
                <span>Add Job</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Render View (Kanban or List) */}
      {viewMode === 'kanban' ? (
        <KanbanBoard
          applications={filteredApplications}
          onStatusChange={updateApplicationStatus}
          onAddInStage={onAddInStage}
          onEdit={onEditApp}
          onDelete={onDeleteApp}
          onViewDetails={onViewDetails}
        />
      ) : (
        <ApplicationListView
          applications={filteredApplications}
          onEdit={onEditApp}
          onDelete={onDeleteApp}
          onViewDetails={onViewDetails}
        />
      )}
    </div>
  );
};
