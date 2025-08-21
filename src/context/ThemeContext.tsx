"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import { darkTheme, lightTheme } from "@lib/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useThemeToggle must be used within ThemeProvider");

  return context;
};

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeMode | null;

    if (storedTheme) {
      setMode(storedTheme);
    } else {
      setMode(prefersDarkMode ? "dark" : "light");
    }
    setMounted(true);
  }, [prefersDarkMode]);

  useEffect(() => {
    if (mounted) localStorage.setItem("theme", mode);
  }, [mode, mounted]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!mounted) return null;

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
