"use client";

import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import { Box, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";

import Logo from "@components/Bases/UI/Logo";
import BaseLink from "@components/Bases/Elements/BaseLink";

const links = [
  { name: "Home", url: "/#hero" },
  { name: "Register", url: "/register" },
  { name: "Login", url: "/login" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Logo size="min" sx={{ mt: 2, mb: 2, cursor: "pointer" }} />
      <List>
        {links.map((link, index) => (
          <ListItem key={index} component={BaseLink} href={link.url} sx={{ color: "text.primary", textDecoration: "none" }}>
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
        backgroundColor: "background.default",
        zIndex: 999,
        transition: "all 0.5s",
        position: "sticky",
        top: 0,
        boxShadow: 1,
      }}>
      <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo size="smaller" sx={{ mt: 1, cursor: "pointer" }} />

        {/* Desktop Navigation */}
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
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

        {/* Mobile Menu Button */}
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: "none" }, ml: 2 }}>
          <Menu />
        </IconButton>
      </Container>

      {/* Mobile Drawer */}
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
