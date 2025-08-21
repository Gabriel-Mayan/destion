import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3A6EA5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#262626",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FAF9F6",
      paper: "#ffffff",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#4F4F4F",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontFamily: "var(--font-raleway)",
      fontSize: "2.2rem",
      fontWeight: 600,
      color: "#1A1A1A",
    },
    h2: {
      fontFamily: "var(--font-raleway)",
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#1A1A1A",
    },
    h3: {
      fontFamily: "var(--font-raleway)",
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#1A1A1A",
    },
    body1: {
      fontSize: "1rem",
      color: "#1A1A1A",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#4F4F4F",
    },
    button: {
      fontFamily: "var(--font-ubuntu)",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#3A6EA5",
          "&:hover": {
            backgroundColor: "#315A85",
          },
        },
        containedSecondary: {
          backgroundColor: "#262626",
          "&:hover": {
            backgroundColor: "#1A1A1A",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#1A1A1A",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3A6EA5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3A6EA5",
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
    h1: {
      fontFamily: "var(--font-raleway)",
      fontSize: "2.2rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h2: {
      fontFamily: "var(--font-raleway)",
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontFamily: "var(--font-raleway)",
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#b3b3b3",
    },
    button: {
      fontFamily: "var(--font-ubuntu)",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
        },
        containedPrimary: {
          backgroundColor: "#3A6EA5",
          "&:hover": {
            backgroundColor: "#315A85",
          },
        },
        containedSecondary: {
          backgroundColor: "#1E1E1E",
          "&:hover": {
            backgroundColor: "#121212",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#ffffff",
        },
      },
    },
  },
});
