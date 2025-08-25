import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Tooltip } from "@mui/material";

import { Avatar } from "@components/Bases/UI/Avatar";
import BaseText from "@components/Bases/Elements/BaseText";

interface User {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ChatHeaderProps {
  creator: User;
  participants: User[];
  chatName?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ creator, participants, chatName }) => {
  const allParticipants = [creator, ...participants.filter((p) => p.id !== creator.id)];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        px: 1,
      }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar name={creator.name} isCreator size={48} />

        <Box>
          <BaseText variant="subtitle1" font="raleway" sx={{ fontWeight: "bold" }}>
            {chatName || creator.name}
          </BaseText>

          <BaseText variant="body2" color="text.secondary">
            {participants.length > 0 ? `${allParticipants.length} participant${allParticipants.length > 1 ? "s" : ""}` : "Just you"}
          </BaseText>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="More">
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
