"use client";

import { Box, Grid, SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

import Stepper from "@components/Bases/UI/Stepper";

type StepItem = {
  label: string;
  component: ComponentType<any>;
};

type MultiStepFormControllerProps = {
  steps: StepItem[];
  initialStep?: number;
  withStepper?: boolean;
  injectedProps?: Record<string, any>;
  contentStyles?: SxProps;
  containerStyles?: SxProps;
  onEnd?: () => void;
  onReset?: () => void;
};

export default function FormController({
  steps,
  initialStep = 0,
  withStepper = true,
  injectedProps = {},
  contentStyles,
  containerStyles,
  onEnd,
  onReset,
}: MultiStepFormControllerProps) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setActiveStep(0);

    if (onReset) {
      onReset();
    }
  };

  const CurrentComponent = steps[activeStep]?.component;

  useEffect(() => {
    if (activeStep >= steps.length) {
      onEnd ? onEnd() : router.push("/not-found");
    }
  }, [activeStep, steps.length, onEnd, router]);

  if (!CurrentComponent) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", p: 2, maxWidth: 1500, ...containerStyles }}>
      {withStepper && <Stepper activeStep={activeStep} steps={steps} />}

      <Grid container sx={{ minHeight: "70vh", maxWidth: "45rem", marginInline: "auto", ...contentStyles }}>
        <CurrentComponent onNextStep={handleNext} onPreviousStep={handleBack} onReset={handleReset} {...injectedProps} />
      </Grid>
    </Box>
  );
}
