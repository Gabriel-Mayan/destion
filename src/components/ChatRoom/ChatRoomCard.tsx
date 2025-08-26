/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Group, Lock, Message, MoreVert } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";

import BaseButton from "@components/Bases/Elements/BaseButton";
import BaseText from "@components/Bases/Elements/BaseText";
import { Avatar } from "@components/Bases/UI/Avatar";

import { app } from "@services/app.service";

import { showToast } from "@utils/notify.util";

import { Session } from "@/types/next-auth";

export interface IChatRoom {
  id: string;
  name: string;
  isPublic: boolean;
  description: string;
  membersCount: number;
  isCreator: boolean;
  category: any;
  onlineUsers: number;
  participants: { id: string; name: string }[];
  isParticipant: boolean;
  creator: { id: any; name: any };
  lastActivity: string;
}

interface ChatRoomCardProps {
  room: IChatRoom;
  session: Session;
  onEnter?: (room: IChatRoom) => void;
  onJoin?: (room: IChatRoom) => void;
}

export const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ room, session, onEnter, onJoin }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditRoom = () => {
    handleMenuClose();
    router.push(`/home/settings/chat/edit/${room.id}`);
  };

  const handleDeleteRoom = async () => {
    handleMenuClose();
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await app({
        url: "api/chat/delete",
        method: "DELETE",
        data: { chatId: room.id },
        token: session?.user.token,
      });
      showToast({ type: "success", message: "Room deleted successfully" });
    } catch (err) {
      showToast({ type: "error", message: "Failed to delete room" });
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        borderRadius: 4,
        p: 1.5,
        transition: "0.2s all",
        "&:hover": { boxShadow: 3 },
      }}>
      <CardHeader
        avatar={<Avatar name={room.name} isCreator={room.isCreator} />}
        title={<BaseText variant="h6" font="raleway" text={room.name} sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }} />}
        subheader={<BaseText variant="body2" text={room.isPublic ? room.category : "Private"} sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }} />}
        action={
          <>
            {!room.isPublic && <Lock fontSize="small" />}
            {room.isCreator && (
              <>
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVert fontSize="small" />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleEditRoom}>Edit Room</MenuItem>
                  <MenuItem onClick={handleDeleteRoom}>Delete Room</MenuItem>
                </Menu>
              </>
            )}
          </>
        }
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
          onClick={() => onJoin?.(room)}
          text={`Join Room`}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            py: { xs: 0.5, sm: 1 },
          }}
        />
      </CardActions>
    </Card>
  );
};
