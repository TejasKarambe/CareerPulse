import Cookies from 'js-cookie';
import { COOKIE_KEYS } from '../utils/constants';

const COOKIE_EXPIRY_DAYS = 365;

export const cookieService = {
  getThemeMode: () => Cookies.get(COOKIE_KEYS.THEME_MODE) || 'system',
  setThemeMode: (mode) => Cookies.set(COOKIE_KEYS.THEME_MODE, mode, { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  getColorPalette: () => Cookies.get(COOKIE_KEYS.COLOR_PALETTE) || 'indigo',
  setColorPalette: (palette) => Cookies.set(COOKIE_KEYS.COLOR_PALETTE, palette, { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  getViewMode: () => Cookies.get(COOKIE_KEYS.VIEW_MODE) || 'kanban',
  setViewMode: (mode) => Cookies.set(COOKIE_KEYS.VIEW_MODE, mode, { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  getDensity: () => Cookies.get(COOKIE_KEYS.DENSITY) || 'comfortable',
  setDensity: (density) => Cookies.set(COOKIE_KEYS.DENSITY, density, { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  getActiveTab: () => Cookies.get(COOKIE_KEYS.ACTIVE_TAB) || 'applications',
  setActiveTab: (tab) => Cookies.set(COOKIE_KEYS.ACTIVE_TAB, tab, { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  isTutorialCompleted: () => Cookies.get(COOKIE_KEYS.TUTORIAL_COMPLETED) === 'true',
  setTutorialCompleted: (val) => Cookies.set(COOKIE_KEYS.TUTORIAL_COMPLETED, val ? 'true' : 'false', { expires: COOKIE_EXPIRY_DAYS, sameSite: 'lax' }),

  getAllPreferences: () => ({
    themeMode: Cookies.get(COOKIE_KEYS.THEME_MODE) || 'system',
    colorPalette: Cookies.get(COOKIE_KEYS.COLOR_PALETTE) || 'indigo',
    viewMode: Cookies.get(COOKIE_KEYS.VIEW_MODE) || 'kanban',
    density: Cookies.get(COOKIE_KEYS.DENSITY) || 'comfortable',
    activeTab: Cookies.get(COOKIE_KEYS.ACTIVE_TAB) || 'applications',
  }),

  clearAllPreferences: () => {
    Object.values(COOKIE_KEYS).forEach((key) => Cookies.remove(key));
  }
};
