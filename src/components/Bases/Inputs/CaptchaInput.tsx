"use client";

import { Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { Box, FormControl, FormHelperText } from "@mui/material";

interface CaptchaInputProps {
  name: string;
  control: any;
  error?: string;
  helperLabel?: string;
}

export default function CaptchaInput({ name, control, error, helperLabel }: Readonly<CaptchaInputProps>) {
  return (
    <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "Confirmação de segurança obrigatória" }}
        render={({ field: { onChange } }) => (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY!} onChange={onChange} />
          </Box>
        )}
      />
      <FormHelperText>{error || helperLabel}</FormHelperText>
    </FormControl>
  );
}
