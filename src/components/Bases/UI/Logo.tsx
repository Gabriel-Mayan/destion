"use client";

import { SxProps, Theme } from "@mui/material";

import BaseImage from "@components/Bases/Elements/BaseImage";

type TImage = {
  target?: string;
  src?: string;
  clean?: boolean;
  style?: any;
  alt?: string;
  href?: string | null;
  width?: number;
  height?: number;
  container?: boolean;
  sx?: SxProps<Theme>;
  size?: "min" | "smaller" | "medium" | "bigger" | "huge";
};

export default function Logo({ href, src, clean, container, sx, target, size = "smaller" }: TImage) {
  const sizeStyles = {
    min: { width: 50, height: "auto" },
    smaller: { width: 100, height: "auto" },
    medium: { width: 150, height: "auto" },
    bigger: { width: 200, height: "auto" },
    huge: { width: 250, height: "auto" },
  };

  const selectedSize = size ? sizeStyles[size] : {};

  return (
    <BaseImage
      src={src ?? `/assets/logo${clean ? "-vazia" : ""}.png`}
      alt={"Logo da Delta Capital"}
      sx={{ ...selectedSize, ...sx }}
      href={href === null ? undefined : (href ?? "/")}
      container={container}
      target={target}
    />
  );
}
