import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import ChatHeader from "../Components/ChatHeader";
import ChatList from "../Components/ChatList";
import UsersList from "../Components/UsersList";
import io from "socket.io-client";
import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
const ChatPage = () => {

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      position={"fixed"}
    >
      <ChatHeader />
      <Box
        display="flex"
        justifyContent="center"
        height="80vh"
        minWidth="420px"
        m="100px 10px 60px 0px"
        width={{ base: "100%", sm: "75%" }}
      >
        <ChatList />
        <ChatBox />
        <UsersList />
      </Box>
    </Box>
  );
};

export default ChatPage;
