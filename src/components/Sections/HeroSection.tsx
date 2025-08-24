"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PlayCircle from "@mui/icons-material/PlayCircle";
import { Box, Button, Container, Grid } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import BaseImage from "@components/Bases/Elements/BaseImage";
import YoutubeVideoModal from "@components/Modal/YoutubeVideoModal";

const data = {
  ctaText: "Register Here",
  title: "Chat made simple,",
  title2: "Connecting with Destion",
  imageSrc: "/assets/hero-img.png",
  videoText: "See Destion in action",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  description:
    "Destion is your new way to stay close to the people who matter. Fast, reliable and secure — our chat app makes every conversation flow naturally.",
};

export default function HeroSection() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Grid
        id="hero"
        maxWidth="xl"
        sx={{
          gap: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" },
          alignItems: "center",
          justifyItems: "center",
          maxWidth: "100vw",
          minHeight: "80vh",
        }}>
        {/* Mobile image */}
        <BaseImage
          alt="Hero Chat Illustration"
          src={data.imageSrc}
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            height: "auto",
            borderRadius: 4,
            my: 4,
            animation: "up-down 2s ease-in-out infinite alternate-reverse",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Text content */}
        <Grid
          sx={{
            mb: { xs: 6, md: 0 },
            display: "grid",
            gap: 4,
            justifyItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
            textAlign: { xs: "center", md: "left" },
          }}>
          <BaseText variant="h3" fontWeight={1000} text={data.title} sx={{ gridColumn: "span 2", mb: -4 }} />
          <BaseText variant="h3" fontWeight={1000} text={data.title2} sx={{ gridColumn: "span 2", mb: -2 }} />
          <BaseText variant="h6" color="text.secondary" text={data.description} sx={{ gridColumn: "span 2", textAlign: "justify" }} />

          <Button variant="contained" color="primary" sx={{ justifySelf: "flex-start" }} onClick={() => router.push("/register")}>
            {data.ctaText}
          </Button>

          <Button onClick={() => setOpen(true)} sx={{ justifySelf: { xs: "center", md: "flex-end" }, fontWeight: 600 }}>
            <PlayCircle sx={{ fontSize: 32, mr: 1, color: "primary.main" }} />
            {data.videoText}
          </Button>
        </Grid>

        {/* Desktop image with rounded and softened edges */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "100%",
            maxWidth: "100vw",
            height: "auto",
            borderRadius: "20px",
            overflow: "hidden",
            ml: 6,
            animation: "up-down 2s ease-in-out infinite alternate-reverse",
            maskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          }}>
          <BaseImage alt="Hero Chat Illustration" src={data.imageSrc} sx={{ width: "100%", height: "auto", display: "block" }} />
        </Box>

        <style>
          {`
            @keyframes up-down {
              0% { transform: translateY(10px); }
              100% { transform: translateY(-10px); }
            }
          `}
        </style>
      </Grid>

      <YoutubeVideoModal open={open} onClose={() => setOpen(false)} url={data.videoUrl} />
    </Container>
  );
}
