import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Settings,
  Database,
  Cookie,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  Palette,
  Sun,
  Moon,
  Laptop,
  HelpCircle
} from 'lucide-react';
import { exportDataAsJSON, importDataFromJSON } from '../../utils/exportImport';
import { COLOR_PALETTES } from '../../utils/constants';

export const SettingsView = () => {
  const {
    themeMode,
    setThemeMode,
    colorPalette,
    setColorPalette,
    viewMode,
    setViewMode,
    density,
    setDensity,
    applications,
    clearDatabase,
    importApplications,
    openTutorial
  } = useApp();

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleExport = () => {
    if (applications.length === 0) {
      alert('Your tracker is currently empty. Add some job applications first!');
      return;
    }
    exportDataAsJSON(applications);
    showNotification('Database exported successfully!');
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importDataFromJSON(file);
      await importApplications(data);
      showNotification(`Imported ${data.length} applications!`);
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="theme-text-primary" />
          Application Settings & Themes
        </h2>
        <p className="text-sm text-slate-500">
          Personalize colors, interface modes, cookies, and local database storage.
        </p>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle size={15} />
          {notification}
        </div>
      )}

      {/* Color Palette Theme Selection Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Palette size={18} className="theme-text-primary" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Application Color Palette
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Persisted in browser cookies</span>
        </div>

        <p className="text-xs text-slate-500">
          Select which primary accent theme you prefer for buttons, navigation, highlights, and indicators.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = colorPalette === palette.id;
            return (
              <button
                key={palette.id}
                onClick={() => {
                  setColorPalette(palette.id);
                  showNotification(`Theme changed to ${palette.name}!`);
                }}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-slate-900 dark:border-white ring-2 ring-slate-900 dark:ring-white bg-slate-50 dark:bg-slate-800'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full shadow-sm shrink-0 flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: palette.primary }}
                >
                  {isSelected && '✓'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {palette.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {palette.primary}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Browser Cookies Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Cookie size={18} className="text-amber-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Interface Appearance & Display
          </h3>
        </div>

        {/* Theme Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">Interface Mode</h4>
            <p className="text-xs text-slate-500">Light, Dark, or automatically match your System OS</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'system', label: 'System', icon: Laptop },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setThemeMode(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                    themeMode === t.id
                      ? 'theme-btn-primary shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Default View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">Default View Mode</h4>
            <p className="text-xs text-slate-500">Saved in browser cookie `careerpulse_view_mode`</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'kanban', label: 'Kanban Board' },
              { id: 'list', label: 'List View' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  viewMode === v.id
                    ? 'theme-btn-primary shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">Feature Walkthrough Guide</h4>
            <p className="text-xs text-slate-500">Replay the step-by-step introduction modal</p>
          </div>
          <Button variant="outline" size="sm" onClick={openTutorial}>
            <HelpCircle size={14} />
            <span>Open Tutorial</span>
          </Button>
        </div>
      </div>

      {/* IndexedDB Data Management */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Database size={18} className="theme-text-primary" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Data Portability & Database Controls
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">
              Export / Import JSON
            </h4>
            <p className="text-xs text-slate-500">
              Keep offline JSON backups of your applications or restore an existing backup.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download size={14} /> Export JSON
            </Button>
            <label className="cursor-pointer">
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
              <span className="inline-flex items-center justify-center font-medium rounded-lg transition-all border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs px-2.5 py-1.5 gap-1.5 cursor-pointer">
                <Upload size={14} /> Import JSON
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="font-medium text-sm text-rose-600 dark:text-rose-400">
              Clear All Applications
            </h4>
            <p className="text-xs text-slate-500">
              Empty your tracker database completely.
            </p>
          </div>
          <Button
            size="sm"
            variant="danger"
            onClick={async () => {
              if (confirm('Are you sure you want to delete all applications?')) {
                await clearDatabase();
                showNotification('All applications removed.');
              }
            }}
          >
            <Trash2 size={14} /> Clear All Records
          </Button>
        </div>
      </div>
    </div>
  );
};
