/* eslint-disable no-unused-vars */
import { Box, Container, Divider, Grid } from "@mui/material";

import BaseText from "@components/Bases/Elements/BaseText";
import { ChatRoomCard, IChatRoom } from "@components/Chat/ChatRoomCard";

import { CreateChatRoomCard } from "./CreateChatRoomCard";

interface Props {
  userRooms: IChatRoom[];
  publicRooms: IChatRoom[];
  onEnterRoom?: (room: IChatRoom) => void;
  onJoinRoom?: (room: IChatRoom) => void;
}

export const ChatRoomsList: React.FC<Props> = ({ userRooms, publicRooms, onEnterRoom, onJoinRoom }) => {
  return (
    <Container sx={{ p: 3 }}>
      <BaseText variant="h4" font="raleway" fontWeight="bold" mb={2} text="Chat Rooms" />
      <BaseText variant="h6" mb={2} text="Your Rooms" />

      <Grid container spacing={3}>
        {userRooms.map((room) => (
          <ChatRoomCard room={room} isMember onEnter={onEnterRoom} />
        ))}

        <CreateChatRoomCard />
      </Grid>

      <Divider sx={{ my: 3 }} />

      <BaseText variant="h6" mb={2} text="Public Rooms" />

      <Grid container spacing={3}>
        {publicRooms.map((room) => (
          <ChatRoomCard room={room} onJoin={onJoinRoom} />
        ))}

        <CreateChatRoomCard />
      </Grid>
    </Container>
  );
};
