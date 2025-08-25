/* eslint-disable no-unused-vars */
import React from "react";
import { Group, Lock, Message, Star } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip } from "@mui/material";

import BaseButton from "@components/Bases/Elements/BaseButton";
import BaseText from "@components/Bases/Elements/BaseText";

export interface IChatRoom {
  id: string;
  name: string;
  isCreator: string;
  isParticipant: string;
  creator: { id: string; name: string };
  description?: string;
  category: string;
  membersCount: number;
  lastActivity: string;
  isPublic: boolean;
}

interface ChatRoomCardProps {
  room: IChatRoom;
  isMember?: boolean;
  onEnter?: (room: IChatRoom) => void;
  onJoin?: (room: IChatRoom) => void;
}

export const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ room, isMember = false, onEnter, onJoin }) => {
  return (
    <Card
      sx={{
        width: "20vw",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: 4,
        p: 2,
        transition: "0.2s all",
        "&:hover": { boxShadow: 3 },
      }}>
      <CardHeader
        avatar={<Avatar>{room.name[0]}</Avatar>}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <BaseText variant="h6" font="raleway" text={room.name} />
            {room.isCreator && (
              <Chip size="small" icon={<Star fontSize="small" />} label="Creator" color="warning" sx={{ height: 20, fontSize: "0.7rem" }} />
            )}
          </Box>
        }
        subheader={<BaseText variant="body2" text={room.isPublic ? room.category : "Private"} />}
        action={room.isPublic ? null : <Lock fontSize="small" />}
      />

      <CardContent sx={{ flex: 1 }}>
        {room.description && <BaseText variant="body2" color="text.secondary" text={room.description} />}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Group fontSize="small" />
            <BaseText variant="body2" text={`${room.membersCount} members`} />
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Message fontSize="small" />
            <BaseText variant="body2" text={room.lastActivity} />
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <BaseButton
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => (isMember ? onEnter : onJoin)?.(room)}
          text={`${isMember ? "Enter" : "Join"} Room`}
        />
      </CardActions>
    </Card>
  );
};
