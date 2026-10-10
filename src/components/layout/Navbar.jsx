import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  Laptop,
  Plus,
  Download,
  Upload,
  Search,
  HelpCircle,
  Palette
} from 'lucide-react';
import { Button } from '../ui/Button';
import { exportDataAsJSON, importDataFromJSON } from '../../utils/exportImport';
import { COLOR_PALETTES } from '../../utils/constants';

export const Navbar = ({ onOpenNewModal }) => {
  const {
    themeMode,
    setThemeMode,
    colorPalette,
    setColorPalette,
    applications,
    importApplications,
    searchQuery,
    setSearchQuery,
    openTutorial
  } = useApp();

  const handleExport = () => {
    if (applications.length === 0) {
      alert('Your tracker is currently empty. Add some job applications first!');
      return;
    }
    exportDataAsJSON(applications);
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importDataFromJSON(file);
      await importApplications(data);
      alert(`Successfully imported ${data.length} job applications!`);
    } catch (err) {
      alert(`Import failed: ${err.message}`);
    }
    e.target.value = '';
  };

  const toggleThemeMode = () => {
    if (themeMode === 'light') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('system');
    else setThemeMode('light');
  };

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            placeholder="Search by role, company, or tech tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Step-by-Step Tutorial Guide Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={openTutorial}
          title="Open interactive step-by-step tutorial guide"
          className="text-xs"
        >
          <HelpCircle size={15} className="text-amber-500" />
          <span className="hidden sm:inline">Guide</span>
        </Button>

        {/* Color Palette Quick Switcher Dropdown */}
        <div className="relative group">
          <button
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            title="Choose Color Theme Palette"
          >
            <span
              className="w-3.5 h-3.5 rounded-full inline-block shadow-xs"
              style={{
                backgroundColor:
                  COLOR_PALETTES.find((p) => p.id === colorPalette)?.primary || '#6366f1',
              }}
            />
            <Palette size={14} className="text-slate-500 dark:text-slate-400" />
          </button>

          {/* Palette Popover */}
          <div className="absolute right-0 mt-1 hidden group-hover:block group-focus-within:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2.5 z-50 w-52">
            <p className="text-[11px] font-bold uppercase text-slate-400 px-2 pb-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
              Color Palette Theme
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {COLOR_PALETTES.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setColorPalette(palette.id)}
                  className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                    colorPalette === palette.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold ring-1 ring-slate-300 dark:ring-slate-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <span className="truncate">{palette.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Mode Toggle (Light/Dark/System) */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleThemeMode}
          title={`Theme: ${themeMode}. Click to switch Light/Dark/System.`}
        >
          {themeMode === 'light' && <Sun size={16} className="text-amber-500" />}
          {themeMode === 'dark' && <Moon size={16} className="text-sky-400" />}
          {themeMode === 'system' && <Laptop size={16} className="text-slate-400" />}
        </Button>

        {/* Export JSON */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          title="Export current database to JSON backup"
        >
          <Download size={15} />
          <span className="hidden md:inline">Export</span>
        </Button>

        {/* Import JSON */}
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />
          <span className="inline-flex items-center justify-center font-medium rounded-lg transition-all border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs px-2.5 py-1.5 gap-1.5 cursor-pointer">
            <Upload size={15} />
            <span className="hidden md:inline">Import</span>
          </span>
        </label>

        {/* Add Application CTA */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenNewModal}
          className="shadow-sm font-semibold"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Application</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </header>
  );
};
