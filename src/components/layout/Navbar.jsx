import React, { useState } from 'react';
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
  Palette,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { exportDataAsJSON, importDataFromJSON } from '../../utils/exportImport';
import { COLOR_PALETTES } from '../../utils/constants';

export const Navbar = ({ onOpenNewModal, onToggleMobileSidebar }) => {
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

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
    <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile Hamburger & Brand Icon */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer shrink-0"
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              placeholder="Search roles, companies, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 sm:hidden cursor-pointer"
            aria-label="Toggle mobile search"
          >
            {mobileSearchOpen ? <X size={15} /> : <Search size={15} />}
          </button>

          {/* Feature Guide */}
          <Button
            variant="outline"
            size="sm"
            onClick={openTutorial}
            title="Feature Guide"
            className="hidden sm:inline-flex text-xs px-2 sm:px-2.5"
          >
            <HelpCircle size={15} className="text-amber-500" />
            <span className="hidden md:inline">Guide</span>
          </Button>

          {/* Color Palette Dropdown */}
          <div className="relative group">
            <button
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
              title="Choose Palette Theme"
            >
              <span
                className="w-3.5 h-3.5 rounded-full inline-block shadow-xs"
                style={{
                  backgroundColor:
                    COLOR_PALETTES.find((p) => p.id === colorPalette)?.primary || '#6366f1',
                }}
              />
              <Palette size={14} className="text-slate-500 dark:text-slate-400 hidden xs:inline" />
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

          {/* Theme Mode Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleThemeMode}
            title={`Current: ${themeMode}. Switch Light/Dark/System.`}
            className="p-2"
          >
            {themeMode === 'light' && <Sun size={15} className="text-amber-500" />}
            {themeMode === 'dark' && <Moon size={15} className="text-sky-400" />}
            {themeMode === 'system' && <Laptop size={15} className="text-slate-400" />}
          </Button>

          {/* Export JSON (Hidden on tiny screens, accessible via Settings) */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            title="Export JSON backup"
            className="hidden md:inline-flex text-xs px-2.5"
          >
            <Download size={14} />
            <span>Export</span>
          </Button>

          {/* Import JSON (Hidden on tiny screens, accessible via Settings) */}
          <label className="cursor-pointer hidden md:inline-flex">
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <span className="inline-flex items-center justify-center font-medium rounded-lg transition-all border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs px-2.5 py-1.5 gap-1.5 cursor-pointer">
              <Upload size={14} />
              <span>Import</span>
            </span>
          </label>

          {/* Add Application CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewModal}
            className="shadow-sm font-semibold text-xs sm:text-sm px-2.5 sm:px-3.5"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Application</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Expandable Mobile Search Row */}
      {mobileSearchOpen && (
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 sm:hidden bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative w-full">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search roles, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 theme-ring-primary"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};
