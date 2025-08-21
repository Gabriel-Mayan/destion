import { styled } from "@mui/material/styles";
import { WhatsApp } from "@mui/icons-material";

const FloatingButtonContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.speedDial,
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const IconWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#25D366",
  color: "white",
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[6],
}));

export default function FloatingWhatsAppButton({ link }: { link: string }) {
  return (
    <FloatingButtonContainer onClick={() => window.open(link, "_blank")}>
      <IconWrapper sx={{ width: 56, height: 56 }}>
        <WhatsApp name="Whatsapp" fontSize="large" sx={{ fontSize: 56 * 0.6, color: "white" }} />
      </IconWrapper>
    </FloatingButtonContainer>
  );
}
