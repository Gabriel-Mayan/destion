import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CustomTypographyProps extends TypographyProps {
  variant?: TypographyProps["variant"];
  font?: "raleway" | "roboto";
  text?: string;
  href?: string;
  lowerCase?: boolean;
  upperCase?: boolean;
}

const BaseText: React.FC<CustomTypographyProps> = ({ children, variant = "body1", font = "roboto", text, sx, upperCase, lowerCase, ...props }) => {
  const fontFamily = `var(--font-${font})`;

  const upperCaseText = text && upperCase ? text.toUpperCase() : null;
  const lowerCaseText = text && lowerCase ? text.toLowerCase() : null;

  return (
    <Typography variant={variant} sx={{ fontFamily, ...sx }} {...props}>
      {text ? upperCaseText || lowerCaseText || text : null}
      {children ? children : null}
    </Typography>
  );
};

export default BaseText;
