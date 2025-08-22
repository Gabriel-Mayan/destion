import { Box, Modal } from "@mui/material";

const YoutubeVideoModal = ({ open, onClose, url, title = "Video Player" }: any) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ width: "80%", bgcolor: "background.paper", borderRadius: "20px", boxShadow: 24, p: 2 }}>
        <iframe
          width="100%"
          height="400px"
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "20px" }}
        />
      </Box>
    </Modal>
  );
};

export default YoutubeVideoModal;
