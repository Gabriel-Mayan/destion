"use client";

import React, { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Box, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";
import BaseLink from "@components/Bases/Elements/BaseLink";

const links = [
  { name: "Home", url: "/#hero" },
  { name: "Register", url: "/register" },
  { name: "Login", url: "/login" },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}>
      <Logo size="min" sx={{ mt: 2, mb: 2, cursor: "pointer" }} />
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem
            key={index}
            component={BaseLink}
            href={link.url}
            sx={{
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { bgcolor: "action.hover" },
            }}>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
          }}>
          <Logo size="smaller" />
        </Box>

        <Grid
          container
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
          {links.map(({ name, url }, index) => (
            <BaseLink
              href={url}
              key={index}
              text={name}
              sx={{
                ml: 4,
                color: "text.primary",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            />
          ))}
        </Grid>

        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: "none" }, ml: 2 }}>
          <MenuIcon />
        </IconButton>
      </Container>

      <Drawer
        open={mobileOpen}
        variant="temporary"
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}>
        {drawer}
      </Drawer>
    </Box>
  );
}
