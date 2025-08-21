"use client";

import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import AppGlobalStyles from "./styles.global";
import { darkTheme, lightTheme } from "./theme";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppGlobalStyles />
      {children}
    </ThemeProvider>
  );
}
