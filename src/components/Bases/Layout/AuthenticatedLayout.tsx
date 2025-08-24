"use client";

import { ReactNode, useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
  session: any;
}

export default function AuthenticatedLayout({ children, session }: AuthenticatedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box" },
        }}>
        <Sidebar session={session} isOpen={sidebarOpen} />
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <IconButton onClick={toggleSidebar} sx={{ display: { xs: "inline-flex", sm: "none" }, mb: 1 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
