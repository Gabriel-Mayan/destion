"use client";

import React from "react";
import { Control, Controller } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

interface SwitchInputProps {
  name: string;
  label: string;
  control: Control<any>;
  defaultValue?: boolean;
}

const SwitchInput: React.FC<SwitchInputProps> = ({ name, label, control, defaultValue = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="primary" />}
          label={label}
        />
      )}
    />
  );
};

export default SwitchInput;
