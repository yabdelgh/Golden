import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/chat/ChatBox";
import ChatList from "../Components/chat/ChatList";

const ChatPage = () => {
  return (
    <Box
      width="100%"
      display="flex"
      position="fixed"
      top="0"
      left="70px"
      height="100vh"
    >
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
