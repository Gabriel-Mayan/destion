"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddButtonProps {
  redirectTo: string;
  size?: "small" | "medium" | "large";
}

export const AddButton: React.FC<AddButtonProps> = ({ redirectTo, size = "small" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo);
  };

  return (
    <IconButton size={size} color="primary" onClick={handleClick}>
      <Add fontSize={size} />
    </IconButton>
  );
};
