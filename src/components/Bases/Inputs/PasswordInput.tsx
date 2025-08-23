"use client";

import { useMemo, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";

import BasicInput from "@components/Bases/Inputs/BasicInput";

interface PasswordInputProps extends Omit<TextFieldProps, "name" | "error"> {
  id?: string;
  name: string;
  maxLength?: number;
  helperLabel?: string;
  error?: string;
  control?: any;
}

export default function PasswordInput({
  id,
  name,
  label,
  helperLabel,
  maxLength,
  required = false,
  disabled = false,
  error,
  control,
  onFocus,
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordAdornment = useMemo(
    () => (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePasswordVisibility}
          onMouseDown={(e) => e.preventDefault()}
          edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    [showPassword]
  );

  return (
    <BasicInput
      id={id}
      type={showPassword ? "text" : "password"}
      name={name}
      label={label}
      maxLength={maxLength}
      required={required}
      disabled={disabled}
      error={error}
      helperLabel={helperLabel}
      control={control}
      onFocus={onFocus}
      endAdornment={passwordAdornment}
    />
  );
}
