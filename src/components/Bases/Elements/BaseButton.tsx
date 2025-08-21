import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface CustomButtomProps extends ButtonProps {
  text?: string;
}

const BaseButton: React.FC<CustomButtomProps> = ({ text, type, children, onClick, ...props }) => {
  return (
    <Button type={type || "button"} onClick={onClick} {...props}>
      {text ? text : null}
      {children ? children : null}
    </Button>
  );
};

export default BaseButton;
