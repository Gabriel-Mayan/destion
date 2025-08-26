"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Container, Divider, IconButton, Menu, MenuItem } from "@mui/material";

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

  const handleMenuClose = () => setAnchorEl(null);

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
        backgroundColor: "background.paper",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 999,
        position: "sticky",
        top: 0,
        px: 2,
        py: 1,
        boxShadow: 2,
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
          onClick={() => router.push("/home")}>
          <Logo size="smaller" />
        </Box>

        <Box>
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              p: 0,
              border: "2px solid",
              borderColor: "divider",
              transition: "all 0.3s",
              "&:hover": {
                borderColor: "primary.main",
                transform: "scale(1.05)",
              },
            }}>
            <Avatar name="Gabriel" isCreator size={40} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow: 4,
                minWidth: 180,
              },
            }}>
            {userMenuLinks.map((item, index) => (
              <Box key={index}>
                <MenuItem
                  component={item.action === "logout" ? "div" : BaseLink}
                  href={item.url}
                  onClick={() => handleMenuItemClick(item)}
                  sx={{
                    py: 1.2,
                    fontSize: "0.95rem",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}>
                  {item.name}
                </MenuItem>
                {item.name === "Configurações" && <Divider />}
              </Box>
            ))}
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}
