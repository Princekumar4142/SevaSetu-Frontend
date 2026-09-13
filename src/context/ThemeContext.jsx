import { createContext, useContext, useEffect, useState, useMemo } from "react";
import userService from "../services/userService";

const THEME_STORAGE_KEY = "sevasetu_theme";

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

const ThemeContext = createContext({
  themeMode: THEME_MODES.SYSTEM,
  resolvedTheme: "light",
  isDark: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Initialize theme mode from localStorage, defaulting to 'system'
  const [themeMode, setThemeModeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === THEME_MODES.LIGHT || saved === THEME_MODES.DARK || saved === THEME_MODES.SYSTEM) {
        return saved;
      }
    }
    return THEME_MODES.SYSTEM;
  });

  // Track system OS preference: true if system prefers dark
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Listen to OS system theme changes in real-time
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setSystemPrefersDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Compute resolved actual theme: 'light' or 'dark'
  const resolvedTheme = useMemo(() => {
    if (themeMode === THEME_MODES.LIGHT) return "light";
    if (themeMode === THEME_MODES.DARK) return "dark";
    // themeMode === THEME_MODES.SYSTEM
    return systemPrefersDark ? "dark" : "light";
  }, [themeMode, systemPrefersDark]);

  // Synchronize with DOM root element
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    // Also update meta theme-color for mobile address bar
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", resolvedTheme === "dark" ? "#0b0f19" : "#ffffff");
  }, [resolvedTheme]);

  // Change theme mode and persist
  const setThemeMode = (mode) => {
    if (mode !== THEME_MODES.LIGHT && mode !== THEME_MODES.DARK && mode !== THEME_MODES.SYSTEM) {
      return;
    }
    setThemeModeState(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (_) {}

    // Sync to backend if user is authenticated
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      userService.updateProfile({ theme: mode }).catch(() => {});
    }
  };

  // Quick toggle between light & dark
  const toggleTheme = () => {
    setThemeMode(resolvedTheme === "dark" ? THEME_MODES.LIGHT : THEME_MODES.DARK);
  };

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      isDark: resolvedTheme === "dark",
      setThemeMode,
      toggleTheme,
    }),
    [themeMode, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
