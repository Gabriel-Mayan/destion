"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Container, IconButton, Menu, MenuItem } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";
import { Avatar } from "@components/Bases/UI/Avatar";
import BaseLink from "@components/Bases/Elements/BaseLink";

const userMenuLinks = [
  { name: "Chats", url: "/home" },
  { name: "Perfil", url: "/home/profile" },
  { name: "Configurações", url: "/home/settings" },
  { name: "Logout", action: "logout" },
];

export default function AuthenticatedHeader() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (item: (typeof userMenuLinks)[number]) => {
    handleMenuClose();

    if (item.action === "logout") {
      await signOut({ redirect: false });

      router.push("/login");
    }
  };

  return (
    <Box
      id="header"
      sx={{
        color: "text.primary",
        backgroundColor: "background.default",
        zIndex: 999,
        transition: "all 0.5s",
        position: "sticky",
        p: 1,
        top: 0,
        boxShadow: 1,
      }}>
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size="smaller" sx={{ mt: 1, cursor: "pointer" }} />

        <Box sx={{ ml: 2 }}>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar name="Gabriel" isCreator size={40} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}>
            {userMenuLinks.map((item, index) => (
              <MenuItem key={index} component={item.action === "logout" ? "div" : BaseLink} href={item.url} onClick={() => handleMenuItemClick(item)}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}
