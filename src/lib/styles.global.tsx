import { GlobalStyles } from "@mui/material";

import { raleway, roboto, ubuntu } from "./fonts";

export default function AppGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        ":root": {
          // cores principais light
          "--background": "#FAF9F6",
          "--foreground": "#1A1A1A",
          "--foreground-secondary": "#4F4F4F",
          "--primary": "#3A6EA5",
          "--primary-hover": "#345c8a",
          "--secondary": "#262626",
          // cores de chat
          "--chat-own-message": "#3A6EA5",
          "--chat-other-message": "#e0e0e0",
          "--chat-avatar-bg": "#cccccc",
          // fonts
          "--font-roboto": roboto.style.fontFamily,
          "--font-raleway": raleway.style.fontFamily,
          "--font-ubuntu": ubuntu.style.fontFamily,
        },
        "@media (prefers-color-scheme: dark)": {
          ":root": {
            "--background": "#121212",
            "--foreground": "#E0E0E0",
            "--foreground-secondary": "#B3B3B3",
            "--primary": "#3A6EA5",
            "--primary-hover": "#558ccf",
            "--secondary": "#1E1E1E",
            // cores de chat dark
            "--chat-own-message": "#3A6EA5",
            "--chat-other-message": "#2a2a2a",
            "--chat-avatar-bg": "#444444",
          },
        },
        html: {
          maxWidth: "100vw",
          overflowX: "hidden",
          scrollPaddingTop: "50px",
          colorScheme: "light",
        },
        "html[data-theme='dark']": {
          colorScheme: "dark",
        },
        body: {
          color: "var(--foreground)",
          background: "var(--background)",
          fontFamily: "var(--font-roboto)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          transition: "background 0.3s ease, color 0.3s ease",
        },
        "*": {
          boxSizing: "border-box",
          padding: 0,
          margin: 0,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "button, input, select, textarea": {
          fontFamily: "inherit",
          color: "inherit",
        },
      }}
    />
  );
}
