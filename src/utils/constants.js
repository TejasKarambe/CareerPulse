export const STAGES = [
  { id: 'applied', label: 'Applied', color: 'indigo', border: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  { id: 'screening', label: 'Screening', color: 'amber', border: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  { id: 'interview', label: 'Interview', color: 'sky', border: 'border-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400' },
  { id: 'offer', label: 'Offer', color: 'emerald', border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  { id: 'rejected', label: 'Rejected', color: 'rose', border: 'border-rose-500', bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400' },
];

export const WORK_ARRANGEMENTS = ['Remote', 'Hybrid', 'On-site'];
export const EMPLOYMENT_TYPES = ['Full-time', 'Contract', 'Part-time', 'Internship'];
export const CURRENCIES = ['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)', 'CAD ($)', 'AUD ($)'];

export const COOKIE_KEYS = {
  THEME_MODE: 'careerpulse_theme_mode', // light, dark, system
  COLOR_PALETTE: 'careerpulse_color_palette', // indigo, emerald, violet, rose, amber, ocean, cyberpunk
  VIEW_MODE: 'careerpulse_view_mode',
  DENSITY: 'careerpulse_density',
  ACTIVE_TAB: 'careerpulse_active_tab',
  TUTORIAL_COMPLETED: 'careerpulse_tutorial_completed',
};

export const COLOR_PALETTES = [
  {
    id: 'indigo',
    name: 'Electric Indigo',
    primary: '#6366f1',
    hover: '#4f46e5',
    light: '#e0e7ff',
    classes: {
      bg: 'bg-indigo-600 hover:bg-indigo-700',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500',
      badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      ring: 'focus:ring-indigo-500',
      gradient: 'from-indigo-600 to-violet-600'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    primary: '#10b981',
    hover: '#059669',
    light: '#d1fae5',
    classes: {
      bg: 'bg-emerald-600 hover:bg-emerald-700',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500',
      badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      ring: 'focus:ring-emerald-500',
      gradient: 'from-emerald-600 to-teal-600'
    }
  },
  {
    id: 'violet',
    name: 'Royal Purple',
    primary: '#8b5cf6',
    hover: '#7c3aed',
    light: '#ede9fe',
    classes: {
      bg: 'bg-purple-600 hover:bg-purple-700',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500',
      badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      ring: 'focus:ring-purple-500',
      gradient: 'from-purple-600 to-pink-600'
    }
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    primary: '#f43f5e',
    hover: '#e11d48',
    light: '#ffe4e6',
    classes: {
      bg: 'bg-rose-600 hover:bg-rose-700',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500',
      badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      ring: 'focus:ring-rose-500',
      gradient: 'from-rose-600 to-orange-500'
    }
  },
  {
    id: 'amber',
    name: 'Warm Sunset',
    primary: '#f59e0b',
    hover: '#d97706',
    light: '#fef3c7',
    classes: {
      bg: 'bg-amber-600 hover:bg-amber-700',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500',
      badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      ring: 'focus:ring-amber-500',
      gradient: 'from-amber-500 to-orange-600'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Cyan',
    primary: '#0ea5e9',
    hover: '#0284c7',
    light: '#e0f2fe',
    classes: {
      bg: 'bg-sky-600 hover:bg-sky-700',
      text: 'text-sky-600 dark:text-sky-400',
      border: 'border-sky-500',
      badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      ring: 'focus:ring-sky-500',
      gradient: 'from-sky-500 to-cyan-600'
    }
  }
];
