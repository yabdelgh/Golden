import React from "react";
import { Box } from "@chakra-ui/react";
import ChatHeader from "../Components/ChatHeader";

const ChatPage = () => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <ChatHeader />
      <Box>what's up</Box>
      <Box>footer</Box>
    </Box>
  );
};

export default ChatPage;
