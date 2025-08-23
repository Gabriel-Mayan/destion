"use client";

import {
  Box,
  CircularProgress,
  IconButton,
  Step,
  StepIconProps,
  StepLabel,
  Stepper as Steppers,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useRef } from "react";

interface MeuStepperProps {
  activeStep: number;
  steps: { label: string }[];
}

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: active || completed ? theme.palette.primary.main : "#999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        fontWeight: "bold",
        color: completed ? theme.palette.primary.main : "#fff",
      }}>
      {icon}
    </Box>
  );
}

export default function Stepper({ activeStep, steps }: MeuStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const stepper = containerRef.current;
      const stepWidth = stepper.scrollWidth / steps.length;
      stepper.scrollTo({
        left: stepWidth * activeStep - stepper.clientWidth / 2 + stepWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeStep, steps.length]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  if (activeStep === steps.length) return null;

  const currentStep = steps[activeStep];
  const nextStep = steps[activeStep + 1];
  const isLastStep = activeStep === steps.length - 1;

  if (isMobile) {
    const percentage = ((activeStep + 1) / steps.length) * 100;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1.5,
          mb: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {currentStep.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isLastStep ? "Último passo" : `Próximo: ${nextStep.label}`}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
          }}>
          <CircularProgress variant="determinate" value={percentage} size={48} thickness={5} sx={{ color: theme.palette.success.main }} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant="caption" fontWeight={600}>
              {activeStep + 1} de {steps.length}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: "2%", px: 2 }}>
      <IconButton onClick={scrollLeft} size="small" sx={{ fontSize: "1.25rem", mr: 2 }}>
        <ChevronLeftIcon fontSize="inherit" />
      </IconButton>

      <Box ref={containerRef} sx={{ overflowX: "auto", flexGrow: 1, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
        <Steppers activeStep={activeStep} sx={{ minWidth: "max-content", flexWrap: "nowrap", whiteSpace: "nowrap" }}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel slots={{ stepIcon: CustomStepIcon }} sx={{ whiteSpace: "nowrap" }}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Steppers>
      </Box>

      <IconButton onClick={scrollRight} size="small" sx={{ fontSize: "1.25rem", ml: 2 }}>
        <ChevronRightIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
