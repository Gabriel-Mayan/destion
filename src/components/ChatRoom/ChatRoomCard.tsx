/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { Group, Lock, Message } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader } from "@mui/material";

import BaseButton from "@components/Bases/Elements/BaseButton";
import BaseText from "@components/Bases/Elements/BaseText";
import { Avatar } from "@components/Bases/UI/Avatar";

export interface IChatRoom {
  id: string;
  name: string;
  isPublic: boolean;
  description: string;
  membersCount: number;
  isCreator: boolean;
  category: any;
  onlineUsers: number;
  participants: {
    id: string;
    name: string;
  }[];
  isParticipant: boolean;
  creator: {
    id: any;
    name: any;
  };
  lastActivity: string;
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
        width: "100%", // ocupa espaço do grid
        minHeight: 180, // evita achatamento
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: 4,
        p: { xs: 1.5, sm: 2 },
        transition: "0.2s all",
        "&:hover": { boxShadow: 3 },
      }}>
      <CardHeader
        avatar={<Avatar name={room.name} isCreator={room.isCreator} />}
        title={<BaseText variant="h6" font="raleway" text={room.name} sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }} />}
        subheader={<BaseText variant="body2" text={room.isPublic ? room.category : "Private"} sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }} />}
        action={room.isPublic ? null : <Lock fontSize="small" />}
      />

      <CardContent sx={{ flex: 1, px: { xs: 1, sm: 2 } }}>
        {room.description && (
          <BaseText
            variant="body2"
            color="text.secondary"
            text={room.description}
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          />
        )}

        <Box display="flex" alignItems="center" mt={2}>
          <Box flex="0 0 auto" mr={1}>
            <Group fontSize="small" />
          </Box>

          <Box display="flex" flexDirection="column" justifyContent={room.onlineUsers ? "space-between" : "center"}>
            <BaseText variant="body2" text={`${room.membersCount} members`} sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }} />
            {room.onlineUsers > 0 && (
              <BaseText
                variant="caption"
                color="text.secondary"
                text={`${room.onlineUsers} online`}
                sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}
              />
            )}
          </Box>

          <Box ml="auto" display="flex" alignItems="center" gap={0.5}>
            <Message fontSize="small" />
            <BaseText variant="body2" text={room.lastActivity} sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }} />
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ px: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}>
        <BaseButton
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => (isMember ? onEnter : onJoin)?.(room)}
          text={`${isMember ? "Enter" : "Join"} Room`}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            py: { xs: 0.5, sm: 1 },
          }}
        />
      </CardActions>
    </Card>
  );
};
