import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/chat/ChatBox";
import ChatList from "../Components/chat/ChatList";

const ChatPage = () => {
  return (
    <Box
      // className="debug"
      width="100%"
      display="flex"
      m="62px 0px 0px 72px"
      height="calc(100vh - 62px)"
    >
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
