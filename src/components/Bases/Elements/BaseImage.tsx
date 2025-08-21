import React from "react";
import { Box, Link, SxProps, Theme } from "@mui/material";

type TImageProps = {
  src: string;
  alt?: string;
  href?: string;
  target?: string;
  sx?: SxProps<Theme>;
  container?: boolean;
};

export default function BaseImage({ src, alt = "image", href, target, sx, container = false }: TImageProps) {
  const myImage = <Box component="img" src={src} alt={alt} sx={{ ...sx }} />;

  const image = href ? (
    <Link href={href} underline="none" target={target}>
      {container ? <Box sx={sx}>{myImage}</Box> : myImage}
    </Link>
  ) : container ? (
    <Box sx={sx}>{myImage}</Box>
  ) : (
    myImage
  );

  return image;
}
