import { GlobalStyles } from "@mui/material";

import { raleway, roboto, ubuntu } from "./fonts";

export default function AppGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        ":root": {
          "--background": "#FAF9F6",
          "--foreground": "#1A1A1A",
          "--foreground-secondary": "#4F4F4F",
          "--primary": "#3A6EA5",
          "--secondary": "#262626",
          "--font-roboto": roboto.style.fontFamily,
          "--font-raleway": raleway.style.fontFamily,
          "--font-ubuntu": ubuntu.style.fontFamily,
        },
        "@media (prefers-color-scheme: dark)": {
          ":root": {
            "--background": "#121212",
            "--foreground": "#ffffff",
            "--foreground-secondary": "#b3b3b3",
            "--primary": "#3A6EA5",
            "--secondary": "#1E1E1E",
          },
        },
        html: {
          maxWidth: "100vw",
          overflowX: "hidden",
          colorScheme: "light",
          scrollPaddingTop: "50px",
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
      }}
    />
  );
}
