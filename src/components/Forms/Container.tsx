"use client";

import { Grid, LinearProgress, SxProps, Theme } from "@mui/material";

import BaseButton from "@components/Bases/Elements/BaseButton";

import Loading from "../Bases/UI/Loading";

type TGridForm = {
  fullLoaderMessage?: string;
  children: React.ReactNode;
  handleSubmit?: any;
  loading?: boolean;
  nextStepText?: string;
  onPreviousStep?: () => void;
  sx?: SxProps<Theme>;
};

export default function FormContainer({ children, loading, handleSubmit, nextStepText, fullLoaderMessage, onPreviousStep, sx }: TGridForm) {
  return (
    <Grid component="form" container direction="column" spacing={1} onSubmit={handleSubmit} sx={{ width: "100%", py: 2, ...sx }}>
      {children}

      <Grid container sx={{ width: "100%", mt: 2 }} justifyContent={onPreviousStep ? "space-between" : "flex-end"}>
        {onPreviousStep && <BaseButton text={"Back"} onClick={onPreviousStep} />}

        <BaseButton type="submit" text={nextStepText ?? "Next"} disabled={loading} />
      </Grid>

      {loading ? fullLoaderMessage ? <Loading mensagem={fullLoaderMessage} /> : <LinearProgress color="inherit" sx={{ width: "100%" }} /> : null}
    </Grid>
  );
}
