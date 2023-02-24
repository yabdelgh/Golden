import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/chat/ChatBox";
import ChatList from "../Components/chat/ChatList";

const ChatPage = () => {
  return (
    <Box
      width="100%"
      display="flex"
      //height="calc(100vh - 60px)"
      // p="2px 0 0 0px"
      overflow="hidden"
    >
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
