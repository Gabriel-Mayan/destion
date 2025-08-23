"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Link as MuiLink, SxProps, TypographyProps } from "@mui/material";

interface SmoothScrollLinkProps {
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps;
  variant?: TypographyProps["variant"];
  font?: "raleway" | "roboto";
  underline?: any;
  text?: string;
  lowerCase?: boolean;
  upperCase?: boolean;
}

const BaseLink: React.FC<SmoothScrollLinkProps> = ({
  href,
  children,
  onClick,
  variant = "body1",
  font = "roboto",
  text,
  sx,
  upperCase,
  lowerCase,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const fontFamily = `var(--font-${font})`;
  const upperCaseText = text && upperCase ? text.toUpperCase() : null;
  const lowerCaseText = text && lowerCase ? text.toLowerCase() : null;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) onClick();

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const sectionId = hash;

      if (pathname === "/" || path === "") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        localStorage.setItem("scrollToId", sectionId);

        router.push(`/#${sectionId}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <MuiLink variant={variant} href={href} onClick={handleClick} sx={{ fontFamily, ...sx }} {...props}>
      {text ? upperCaseText || lowerCaseText || text : null}
      {children ? children : null}
    </MuiLink>
  );
};

export default BaseLink;
