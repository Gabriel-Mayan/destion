/* eslint-disable no-unused-vars */
"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState } from "react";
import { IconButton, Popover } from "@mui/material";

interface ChatEmojiPickerProps {
  onSelect: (emoji: any) => void;
}

const EmojiPicker: React.FC<ChatEmojiPickerProps> = ({ onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEmojiSelect = (emoji: any) => {
    onSelect(emoji);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="primary">
        😊
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
      </Popover>
    </>
  );
};

export default EmojiPicker;
