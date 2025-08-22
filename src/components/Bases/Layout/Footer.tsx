"use client";

import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { ArrowForward, GitHub, LinkedIn } from "@mui/icons-material";

import BaseText from "@components/Bases/Elements/BaseText";
import BaseLink from "@components/Bases/Elements/BaseLink";

const appInfo = {
  name: "Destion",
  city: "Salvador",
  state: "Bahia, Brazil",
  contact: "+55 71 9 9187-9702",
  email: "gabrielmayan@gmail.com",
};

const socialLinks = [
  { icon: <GitHub />, url: "https://github.com/Gabriel-Mayan" },
  { icon: <LinkedIn />, url: "https://www.linkedin.com/in/gabrielmayan/" },
];

const usefulLinks = [
  { name: "Home", url: "/#hero" },
  { name: "About", url: "/about" },
  { name: "Features", url: "/features" },
  { name: "Terms of Service", url: "/terms" },
  { name: "Privacy Policy", url: "/privacy" },
];

const resources = [
  { name: "Help Center", url: "/help" },
  { name: "Community", url: "/community" },
  { name: "Developers", url: "/developers" },
  { name: "Blog", url: "/blog" },
  { name: "Contact Support", url: "/support" },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", color: "text.primary", pt: 6 }}>
      <Grid
        paddingX={{ xs: 2, sm: 12 }}
        sx={{
          gap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        }}>
        <Grid mb={2}>
          <BaseText variant="h6" fontWeight={600} fontFamily="var(--font-raleway)" color="primary.main" text={appInfo.name} />
          <BaseText mt={2} color="text.secondary" text={appInfo.city} />
          <BaseText color="text.secondary" text={appInfo.state} />

          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <BaseText color="text.secondary" text={"Contact: "} sx={{ fontWeight: "bold" }} />
            <BaseText color="text.secondary" text={appInfo.contact} />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <BaseText color="text.secondary" text={"Email: "} sx={{ fontWeight: "bold" }} />
            <BaseText color="text.secondary" text={appInfo.email} />
          </Box>
        </Grid>

        <Grid mb={2}>
          <BaseText variant="h6" fontFamily="var(--font-raleway)" color="primary.main" text="Useful Links" />
          {usefulLinks.map(({ name, url }, index) => (
            <BaseText key={name} mt={1} display="flex" alignItems="center">
              <ArrowForward fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
              <BaseLink href={url} key={index} text={name} underline="none" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }} />
            </BaseText>
          ))}
        </Grid>

        <Grid mb={2}>
          <BaseText variant="h6" fontFamily="var(--font-raleway)" color="primary.main" text="Resources" />
          {resources.map(({ name, url }, index) => (
            <BaseText key={name} mt={1} display="flex" alignItems="center">
              <ArrowForward fontSize="small" sx={{ mr: 1, color: "primary.main" }} />
              <BaseLink href={url} key={index} text={name} underline="none" sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }} />
            </BaseText>
          ))}
        </Grid>

        <Grid mb={2}>
          <BaseText variant="h6" fontFamily="var(--font-raleway)" color="primary.main" text="Follow Us" />
          <Box display="flex" justifyContent="start">
            {socialLinks.map(({ icon, url }, index) => (
              <IconButton key={index} href={url} target="_blank" color="primary" sx={{ "&:hover": { backgroundColor: "primary.light" } }}>
                {icon}
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>

      <BaseText mt={4} borderTop={1} py={1} textAlign={"center"} fontFamily="var(--font-roboto)" color="text.secondary">
        © <strong>{appInfo.name}</strong> All Rights Reserved
      </BaseText>
    </Box>
  );
}
