import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getAllApplications,
  saveApplication as dbSaveApplication,
  deleteApplication as dbDeleteApplication,
  bulkInsertApplications,
  clearAllApplications
} from '../services/db';
import { cookieService } from '../services/cookieService';
import { COLOR_PALETTES } from '../utils/constants';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTabState] = useState(cookieService.getActiveTab());
  const [themeMode, setThemeModeState] = useState(cookieService.getThemeMode());
  const [colorPalette, setColorPaletteState] = useState(cookieService.getColorPalette());
  const [viewMode, setViewModeState] = useState(cookieService.getViewMode());
  const [density, setDensityState] = useState(cookieService.getDensity());
  const [tutorialOpen, setTutorialOpen] = useState(!cookieService.isTutorialCompleted());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedArrangement, setSelectedArrangement] = useState('all');
  const [sortBy, setSortBy] = useState('appliedDate-desc');

  // Load from IndexedDB
  const refreshApplications = useCallback(async () => {
    try {
      const data = await getAllApplications();
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications from IndexedDB', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshApplications();
  }, [refreshApplications]);

  // Apply Light/Dark/System Theme Mode
  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      const isDark =
        themeMode === 'dark' ||
        (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    updateTheme();

    // Listen to OS theme changes if on system
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (themeMode === 'system') updateTheme();
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [themeMode]);

  // Apply Color Palette Theme
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', colorPalette);
  }, [colorPalette]);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    cookieService.setThemeMode(mode);
  };

  const setColorPalette = (paletteId) => {
    setColorPaletteState(paletteId);
    cookieService.setColorPalette(paletteId);
  };

  const setViewMode = (mode) => {
    setViewModeState(mode);
    cookieService.setViewMode(mode);
  };

  const setDensity = (newDensity) => {
    setDensityState(newDensity);
    cookieService.setDensity(newDensity);
  };

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    cookieService.setActiveTab(tab);
  };

  const completeTutorial = () => {
    setTutorialOpen(false);
    cookieService.setTutorialCompleted(true);
  };

  const openTutorial = () => {
    setTutorialOpen(true);
  };

  // Add / Edit Application
  const upsertApplication = async (app) => {
    const itemToSave = {
      ...app,
      id: app.id || `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      appliedDate: app.appliedDate || new Date().toISOString().slice(0, 10),
      interviewDates: app.interviewDates || [],
      interviewQuestions: app.interviewQuestions || [],
      tags: app.tags || [],
    };

    if (itemToSave.status === 'offer' && (!app.id || app.status !== 'offer')) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    await dbSaveApplication(itemToSave);
    await refreshApplications();
    return itemToSave;
  };

  // Update Status directly (Kanban drag)
  const updateApplicationStatus = async (id, newStatus) => {
    const target = applications.find((a) => a.id === id);
    if (!target) return;

    if (newStatus === 'offer' && target.status !== 'offer') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    const updated = { ...target, status: newStatus };
    await dbSaveApplication(updated);
    setApplications((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  // Delete
  const removeApplication = async (id) => {
    await dbDeleteApplication(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Clear all
  const clearDatabase = async () => {
    await clearAllApplications();
    setApplications([]);
  };

  // Import
  const importApplications = async (importedList) => {
    await bulkInsertApplications(importedList);
    await refreshApplications();
  };

  const currentPaletteConfig = COLOR_PALETTES.find((p) => p.id === colorPalette) || COLOR_PALETTES[0];

  return (
    <AppContext.Provider
      value={{
        applications,
        loading,
        activeTab,
        setActiveTab,
        themeMode,
        setThemeMode,
        colorPalette,
        setColorPalette,
        currentPaletteConfig,
        viewMode,
        setViewMode,
        density,
        setDensity,
        tutorialOpen,
        openTutorial,
        completeTutorial,
        searchQuery,
        setSearchQuery,
        selectedStage,
        setSelectedStage,
        selectedArrangement,
        setSelectedArrangement,
        sortBy,
        setSortBy,
        upsertApplication,
        updateApplicationStatus,
        removeApplication,
        clearDatabase,
        importApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
