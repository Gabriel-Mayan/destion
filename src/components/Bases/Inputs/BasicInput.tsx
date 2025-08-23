"use client";

import { JSX } from "react";
import { Controller } from "react-hook-form";
import { FormControl, TextField, TextFieldProps } from "@mui/material";

interface BasicInputProps extends Omit<TextFieldProps, "name" | "error"> {
  id?: string;
  name: string;
  maxLength?: number;
  helperLabel?: string;
  error?: string;
  control?: any;
  readOnly?: boolean;
  lowerCase?: boolean;
  upperCase?: boolean;
  endAdornment?: JSX.Element;
  startAdornment?: JSX.Element;
}

export default function BasicInput({
  name,
  placeholder = "Digite...",
  maxLength,
  helperLabel,
  endAdornment,
  startAdornment,
  error,
  control,
  readOnly = false,
  required = false,
  lowerCase = false,
  upperCase = false,
  ...props
}: Readonly<BasicInputProps>) {
  return (
    <FormControl variant="outlined" fullWidth sx={{ mb: 2 }} error={!!error}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Este campo é obrigatório" : false,
          maxLength: maxLength ? { value: maxLength, message: `Máximo de ${maxLength} caracteres` } : undefined,
        }}
        render={({ field: { onChange, value = "", ...propsFields }, fieldState: { error } }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let inputValue = e.target.value || "";

            if (lowerCase) inputValue = inputValue.toLowerCase();
            if (upperCase) inputValue = inputValue.toUpperCase();

            onChange(inputValue);
            e.target.value = value;
          };

          return (
            <TextField
              {...props}
              {...propsFields}
              name={name}
              value={value}
              error={!!error}
              placeholder={placeholder}
              onChange={handleChange}
              helperText={error?.message || helperLabel}
              slotProps={{
                htmlInput: { maxLength, readOnly },
                input: { endAdornment, startAdornment },
              }}
            />
          );
        }}
      />
    </FormControl>
  );
}
