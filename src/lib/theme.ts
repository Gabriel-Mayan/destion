/* eslint-disable no-unused-vars */
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    chat: {
      ownMessage: string;
      otherMessage: string;
      avatarBg: string;
    };
  }
  interface PaletteOptions {
    chat?: {
      ownMessage?: string;
      otherMessage?: string;
      avatarBg?: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3A6EA5", contrastText: "#ffffff" },
    secondary: { main: "#262626", contrastText: "#ffffff" },
    background: { default: "#FAF9F6", paper: "#ffffff" },
    text: { primary: "#1A1A1A", secondary: "#4F4F4F" },
    chat: {
      ownMessage: "#3A6EA5",
      otherMessage: "#e0e0e0",
      avatarBg: "#cccccc",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: { fontFamily: "var(--font-raleway)", fontSize: "2.2rem", fontWeight: 600, color: "#1A1A1A" },
    h2: { fontFamily: "var(--font-raleway)", fontSize: "1.8rem", fontWeight: 600, color: "#1A1A1A" },
    h3: { fontFamily: "var(--font-raleway)", fontSize: "1.5rem", fontWeight: 600, color: "#1A1A1A" },
    body1: { fontSize: "1rem", color: "#1A1A1A" },
    body2: { fontSize: "0.9rem", color: "#4F4F4F" },
    button: { fontFamily: "var(--font-ubuntu)", fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "8px 16px" },
        containedPrimary: { backgroundColor: "#3A6EA5", "&:hover": { backgroundColor: "#315A85" } },
        containedSecondary: { backgroundColor: "#262626", "&:hover": { backgroundColor: "#1A1A1A" } },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: "#ffffff", color: "#1A1A1A" } },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3A6EA5", contrastText: "#ffffff" },
    secondary: { main: "#3A6EA5", contrastText: "#ffffff" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#E0E0E0", secondary: "#B3B3B3" },
    chat: {
      ownMessage: "#3A6EA5",
      otherMessage: "#2a2a2a",
      avatarBg: "#444444",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: { fontFamily: "var(--font-raleway)", fontSize: "2.2rem", fontWeight: 600, color: "#E0E0E0" },
    h2: { fontFamily: "var(--font-raleway)", fontSize: "1.8rem", fontWeight: 600, color: "#E0E0E0" },
    h3: { fontFamily: "var(--font-raleway)", fontSize: "1.5rem", fontWeight: 600, color: "#E0E0E0" },
    body1: { fontSize: "1rem", color: "#E0E0E0" },
    body2: { fontSize: "0.9rem", color: "#B3B3B3" },
    button: { fontFamily: "var(--font-ubuntu)", fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "8px 16px" },
        containedPrimary: { backgroundColor: "#3A6EA5", "&:hover": { backgroundColor: "#558CCF" } },
        containedSecondary: { backgroundColor: "#1E1E1E", "&:hover": { backgroundColor: "#121212" } },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundColor: "#1E1E1E", color: "#E0E0E0" } },
    },
  },
});
